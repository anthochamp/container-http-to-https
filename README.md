# HTTP to HTTPS Redirect Container Images

![GitHub License](https://img.shields.io/github/license/anthochamp/container-http-to-https?style=for-the-badge)
![GitHub Release](https://img.shields.io/github/v/release/anthochamp/container-http-to-https?style=for-the-badge&color=457EC4)
![GitHub Release Date](https://img.shields.io/github/release-date/anthochamp/container-http-to-https?style=for-the-badge&display_date=published_at&color=457EC4)

Container images based on the [official nginx image](https://hub.docker.com/_/nginx) that redirect all HTTP requests to their HTTPS equivalent, with a configurable target port and redirect type.

## Quick start

```shell
docker run -p 1234:80 anthochamp/http-to-https
```

```shell
curl -I http://localhost:1234
```

```text
HTTP/1.1 308 Permanent Redirect
Location: https://localhost/
```

With custom port and temporary redirect:

```shell
docker run -p 1234:80 \
  -e HTTP2HTTPS_REDIRECT_PORT=5678 \
  -e HTTP2HTTPS_TEMPORARY_REDIRECT=1 \
  anthochamp/http-to-https
```

```shell
curl -I http://localhost:1234/?q=search
```

```text
HTTP/1.1 307 Temporary Redirect
Location: https://localhost:5678/?q=search
```

## Configuration

All environment variables support Docker secrets via the `__FILE` suffix (e.g. `HTTP2HTTPS_REDIRECT_PORT__FILE=/run/secrets/redirect_port`).

| Variable | Default | Description |
| --- | --- | --- |
| `HTTP2HTTPS_REDIRECT_PORT` | — | Port to use in the redirected HTTPS URL; leave empty to omit the port (default HTTPS port 443) |
| `HTTP2HTTPS_TEMPORARY_REDIRECT` | `0` | Set to `1` for HTTP 307 Temporary Redirect; default is `0` (HTTP 308 Permanent Redirect) |
