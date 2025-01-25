FROM ubuntu:24.10 AS base

RUN apt-get update

# Install tauri dependencies
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

# Install rust
RUN curl --proto '=https' --tlsv1.2 https://sh.rustup.rs -sSf | sh -s -- -y
ENV PATH="/root/.cargo/bin:$PATH"
RUN cargo install tauri-cli

# Install deno
RUN apt-get install -y \
    unzip

RUN curl -fsSL https://deno.land/install.sh | sh

ENV DENO_INSTALL=/root/.deno
ENV PATH=$DENO_INSTALL/bin:$PATH

# Development environment
FROM base AS devenv

RUN apt-get install -y \
    git \
    vim

RUN git config --global core.editor vi

FROM base AS android

# Install android dependencies
RUN apt-get install -y \
    android-sdk \
    google-android-ndk-r25c-installer \
    sdkmanager

ENV ANDROID_HOME=/usr/lib/android-sdk
ENV PATH=$ANDROID_HOME/platform-tools:$ANDROID_HOME/tools/bin:$PATH

ENV NDK_HOME=/usr/lib/android-ndk
ENV PATH=$NDK_HOME:$PATH

# Accept android licenses
RUN yes | sdkmanager --licenses

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
