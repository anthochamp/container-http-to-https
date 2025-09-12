# HTTP to HTTPS redirect Web Server container images

Container images based on the [official nginx image](https://hub.docker.com/_/nginx) that redirect all HTTP or HTTPS requests to the equivalent HTTPS URL, with an optional configurable port.

Sources are available on [GitHub](https://github.com/anthochamp/container-http-to-https).

<!-- TOC tocDepth:2..3 chapterDepth:2..6 -->

- [Image tags](#image-tags)
- [How to use this image](#how-to-use-this-image)
- [Configuration](#configuration)
  - [HTTP2HTTPS_REDIRECT_PORT](#http2https_redirect_port)
  - [HTTP2HTTPS_TEMPORARY_REDIRECT](#http2https_temporary_redirect)

<!-- /TOC -->

## Image tags

- `x.y.z-nginxA.B.C`: Container image version `x.y.z` with nginx `A.B.C`.
- `edge-nginxA.B.C`: Latest commit build with nginx `A.B.C`.

**Tag Aliases:**

- `x.y-nginxA.B.C`: Latest patch of `x.y` (major.minor) with nginx `A.B.C`.
- `x-nginxA.B.C`: Latest minor+patch of `x` (major) with nginx `A.B.C`.
- `x.y.z`: Version `x.y.z` with latest nginx (only latest container version updated).
- `x.y`: Latest patch of `x.y` (major.minor) with latest nginx (only latest container major.minor updated).
- `x`: Latest minor+patch of `x` (major) with latest nginx (only latest container major updated).
- `nginxA.B`: Latest container with latest patch of nginx `A.B` (major.minor).
- `nginxA`: Latest container with latest minor+patch of nginx `A` (major).
- `latest`: Latest `x.y.z-nginxA.B.C` tag.
- `edge-nginxA.B`: Latest commit build with latest patch of nginx `A.B` (major.minor).
- `edge-nginxA`: Latest commit build with latest minor+patch of nginx `A` (major).
- `edge`: Latest `edge-nginxA.B.C` tag;

## How to use this image

Start it with default configuration :

```shell
docker run -p 1234:80 anthochamp/http-to-https
```

And test it :

```shell
curl -I http://localhost:1234
```

```text
HTTP/1.1 308 Permanent Redirect
Server: nginx
Date: Thu, 01 Jan 2024 00:00:00 GMT
Content-Type: text/html
Content-Length: 164
Connection: keep-alive
Location: https://localhost/
```

Or configure it with environment variables :

```shell
docker run -p 1234:80 \
  -e HTTP2HTTPS_REDIRECT_PORT=5678 \
  -e HTTP2HTTPS_TEMPORARY_REDIRECT=1 \
  anthochamp/http-to-https
```

which gives :

```shell
curl -I http://localhost:1234/?q=search
```

```text
HTTP/1.1 307 Temporary Redirect
Server: nginx
Date: Thu, 01 Jan 2024 00:00:00 GMT
Content-Type: text/html
Content-Length: 164
Connection: keep-alive
Location: https://localhost:5678/?q=search
```

## Configuration

You can also configure sensitive values by appending `__FILE` to any supported environment variable name. When set, the container will read the variable's value from the specified file path instead of the environment. This is commonly used with Docker secrets (e.g., `HTTP2HTTPS_REDIRECT_PORT__FILE=/run/secrets/redirect_port`).

### HTTP2HTTPS_REDIRECT_PORT

Port to use in the redirected URL. Leave empty to use the default HTTPS port (no port added).

### HTTP2HTTPS_TEMPORARY_REDIRECT

Set to `1` for HTTP 307 Temporary Redirect. Default is `0` (HTTP 308 Permanent Redirect).
