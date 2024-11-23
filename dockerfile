FROM ubuntu:24.10 as bare

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

# Install deno
RUN apt-get install -y \
    unzip

RUN curl -fsSL https://deno.land/install.sh | sh

ENV DENO_INSTALL=/root/.deno
ENV PATH=$DENO_INSTALL/bin:$PATH

# Development environment
FROM bare as dev

RUN apt-get install -y \
    git \
    vim

RUN git config --global core.editor vi
