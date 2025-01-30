FROM mcr.microsoft.com/vscode/devcontainers/base:ubuntu-24.04 AS base

# ------------------------------------------------------------------------------------------------
# Install tauri
# ------------------------------------------------------------------------------------------------
RUN apt-get update && \
    apt-get install -y \
    libwebkit2gtk-4.1-dev \
    build-essential \
    curl \
    wget \
    file \
    libxdo-dev \
    libssl-dev \
    libayatana-appindicator3-dev \
    librsvg2-dev

# ------------------------------------------------------------------------------------------------
# Install rust
# ------------------------------------------------------------------------------------------------
RUN curl --proto '=https' --tlsv1.2 https://sh.rustup.rs -sSf | sh -s -- -y
ENV PATH="/root/.cargo/bin:$PATH"
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
# Android builder
# ------------------------------------------------------------------------------------------------
FROM base AS android-builder

# ------------------------------------------------------------------------------------------------
# Install android sdk
# ------------------------------------------------------------------------------------------------

# Install dependencies
RUN apt-get install -y \
    openjdk-11-jdk \
    wget \
    unzip \
    && rm -rf /var/lib/apt/lists/*

# Set environment variables
ENV ANDROID_HOME=/opt/android-sdk
ENV PATH=$ANDROID_HOME/cmdline-tools/latest/bin:$ANDROID_HOME/platform-tools:$PATH

# Download and install Android SDK Command-line tools
RUN mkdir -p $ANDROID_HOME/cmdline-tools \
    && wget -q https://dl.google.com/android/repository/commandlinetools-linux-11076708_latest.zip -O sdk-tools.zip \
    && unzip sdk-tools.zip -d $ANDROID_HOME/cmdline-tools \
    && mv $ANDROID_HOME/cmdline-tools/cmdline-tools $ANDROID_HOME/cmdline-tools/latest \
    && rm sdk-tools.zip

# Accept SDK licenses
RUN yes | sdkmanager --licenses

# Install necessary sdk packages
RUN sdkmanager "platform-tools" "platforms;android-33" "build-tools;33.0.2"

# ------------------------------------------------------------------------------------------------
# Rust setup for android
# ------------------------------------------------------------------------------------------------

# Install rust android targets
RUN rustup target add \
    aarch64-linux-android \
    armv7-linux-androideabi \
    i686-linux-android \
    x86_64-linux-android

# Build the app
WORKDIR /app
COPY . .
RUN cargo tauri android build

# Copy outputs
RUN mkdir /out && \
    cp src-tauri/gen/android/app/build/outputs/apk/universal/release/app-universal-release.apk /out/ && \
    cp src-tauri/gen/android/app/build/outputs/bundle/universalRelease/app-universal-release.aab /out/

# ------------------------------------------------------------------------------------------------
# Development environment
# ------------------------------------------------------------------------------------------------
FROM base AS devenv

RUN apt-get install -y \
    git \
    vim

RUN git config --global core.editor vi
