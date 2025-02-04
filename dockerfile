ARG USER="root"
ARG ANDROID_BUILD_TOOLS_VERSION="33.0.2"
ARG ANDROID_NDK_VERSION="25.2.9519653"
ARG ANDROID_EMULATOR_NAME="devenv_emulator"

FROM mcr.microsoft.com/vscode/devcontainers/base:ubuntu-24.04 AS base

RUN apt-get update

# ------------------------------------------------------------------------------------------------
# Install cargo
# ------------------------------------------------------------------------------------------------
RUN curl --proto '=https' --tlsv1.2 https://sh.rustup.rs -sSf | sh -s -- -y
ENV PATH="/root/.cargo/bin:$PATH"

# ------------------------------------------------------------------------------------------------
# Install tauri
# ------------------------------------------------------------------------------------------------

RUN apt-get install -y \
    libwebkit2gtk-4.1-dev \
    build-essential \
    curl \
    wget \
    file \
    libxdo-dev \
    libssl-dev \
    libayatana-appindicator3-dev \
    librsvg2-dev

RUN cargo install tauri-cli

# ------------------------------------------------------------------------------------------------
# Install deno
# ------------------------------------------------------------------------------------------------
RUN apt-get install -y \
    unzip

RUN curl -fsSL https://deno.land/install.sh | sh

ENV DENO_INSTALL=/root/.deno
ENV PATH=$DENO_INSTALL/bin:$PATH

# ------------------------------------------------------------------------------------------------
# Android base
# ------------------------------------------------------------------------------------------------
FROM base AS android-base

# ------------------------------------------------------------------------------------------------
# Install android sdk
# ------------------------------------------------------------------------------------------------

# Install dependencies
RUN apt-get install -y \
    openjdk-17-jdk \
    wget \
    unzip

ARG ANDROID_BUILD_TOOLS_VERSION
ARG ANDROID_NDK_VERSION

# Set environment variables
ENV ANDROID_HOME="/opt/android-sdk"
ENV ANDROID_NDK_ROOT="$ANDROID_HOME/ndk"
ENV NDK_HOME="$ANDROID_NDK_ROOT/$ANDROID_NDK_VERSION"
ENV PATH="$ANDROID_HOME/cmdline-tools/latest/bin:$PATH"
ENV PATH="$ANDROID_HOME/platform-tools:$ANDROID_NDK_ROOT:$PATH"
ENV PATH="$ANDROID_HOME/build-tools/$ANDROID_BUILD_TOOLS_VERSION:$PATH"

# Download and install Android SDK Command-line tools
RUN mkdir -p $ANDROID_HOME/cmdline-tools \
    && wget -q https://dl.google.com/android/repository/commandlinetools-linux-11076708_latest.zip -O sdk-tools.zip \
    && unzip sdk-tools.zip -d $ANDROID_HOME/cmdline-tools \
    && mv $ANDROID_HOME/cmdline-tools/cmdline-tools $ANDROID_HOME/cmdline-tools/latest \
    && rm sdk-tools.zip

# Accept SDK licenses
RUN yes | sdkmanager --licenses

# Install necessary SDK packages
RUN sdkmanager \
    "platform-tools" \
    "platforms;android-33" \
    "build-tools;$ANDROID_BUILD_TOOLS_VERSION" \
    "ndk;$ANDROID_NDK_VERSION"

# ------------------------------------------------------------------------------------------------
# Rust setup for android
# ------------------------------------------------------------------------------------------------

# Install rust android targets
RUN rustup target add \
    aarch64-linux-android \
    armv7-linux-androideabi \
    i686-linux-android \
    x86_64-linux-android

# ------------------------------------------------------------------------------------------------
# Android builder
# ------------------------------------------------------------------------------------------------
FROM android-base as android-builder

# Build the app
WORKDIR /app
COPY . .
RUN cargo tauri android build

# Copy outputs
RUN mkdir /out && \
    cp src-tauri/gen/android/app/build/outputs/apk/universal/release/*.apk /out/ && \
    cp src-tauri/gen/android/app/build/outputs/bundle/universalRelease/*.aab /out/

# ------------------------------------------------------------------------------------------------
# Development environment
# ------------------------------------------------------------------------------------------------
FROM android-base as devenv

ARG ANDROID_EMULATOR_NAME
ARG USER

# ------------------------------------------------------------------------------------------------
# -- Install common tools
# ------------------------------------------------------------------------------------------------

RUN apt-get install -y \
    git \
    vim

RUN git config --global core.editor vi

# ------------------------------------------------------------------------------------------------
# -- Install Android Emulator
# ------------------------------------------------------------------------------------------------

RUN sdkmanager "emulator"

# Enable KVM (required for hardware acceleration)
RUN apt-get install -y \
    qemu-kvm \
    libvirt-daemon-system \
    libvirt-clients \
    bridge-utils

# Add current user to kvm group
RUN adduser $USER kvm

# ------------------------------------------------------------------------------------------------
# -- Create and start an Android Emulator
# ------------------------------------------------------------------------------------------------

# Install a system image (e.g., Pixel 3a, API 33)
RUN sdkmanager "system-images;android-33;google_apis;x86_64"

# Create a new AVD
RUN avdmanager create avd -n $ANDROID_EMULATOR_NAME \
    -k "system-images;android-33;google_apis;x86_64" \
    --device "pixel_7"

# Ensure the emulator starts properly
# RUN echo "hw.cpu.ncore=2" >> /root/.android/avd/$ANDROID_EMULATOR_NAME.avd/config.ini

ENV ANDROID_EMULATOR_HOME="$ANDROID_HOME/emulator"
ENV PATH="$ANDROID_EMULATOR_HOME:$PATH"
