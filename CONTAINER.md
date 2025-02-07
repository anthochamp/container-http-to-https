# HTTP to HTTPS redirect Web Server container images

Container images based on the [official nginx image](https://hub.docker.com/_/nginx) which respond to any request made on it (HTTP or HTTPS schemes) with a redirect to an equivalent URL with a HTTPS scheme and a configurable port.

Sources are available on [GitHub](https://github.com/anthochamp/container-http-to-https).

<!-- TOC tocDepth:2..3 chapterDepth:2..6 -->

- [Image tags](#image-tags)
- [How to use this image](#how-to-use-this-image)
- [Configuration](#configuration)
  - [HTTP2HTTPS_REDIRECT_PORT](#http2https_redirect_port)
  - [HTTP2HTTPS_TEMPORARY_REDIRECT](#http2https_temporary_redirect)

<!-- /TOC -->

## Image tags

- `x.y.z-nginxA.B.C` tags the `x.y.z` container image version, embedded with
the nginx `A.B.C` version.
- `edge-nginxA.B.C` tags the container image built from the last repository
commit, embedded with the nginx `A.B.C` version.

Tags aliases :

- `x.y-nginxA.B.C` aliases the latest patch version of the container image `x.y`
major+minor version, embedded with the nginx `A.B.C` version;
- `x-nginxA.B.C` aliases the latest minor+patch version of the container image
`x` major version, embedded with the nginx `A.B.C` version;
- `x.y.z` aliases the `x.y.z` container image version embedded with the latest
nginx version (Note: only the latest container image version gets updated);
- `x.y` aliases the latest patch version of the container image `x.y` major+minor
version, embedded with the latest nginx release (Note: only the latest container
image major+minor version gets updated);
- `x` aliases the latest minor+patch version of the container image `x` major
version, embedded with the latest nginx version (Note: only the latest container
image major version gets updated);
- `nginxA.B` aliases the latest container image version, embedded with the latest
patch version of the nginx `A.B` major+minor version;
- `nginxA` aliases the latest container image version, embedded with the latest
minor+patch version of the nginx `A` major version;
- `latest` aliases the latest `x.y.z-nginxA.B.C` tag;
- `edge-nginxA.B` aliases the container image built from the last repository
commit, embedded with the latest patch version of the nginx `A.B` major+minor
version;
- `edge-nginxA` aliases the container image built from the last repository
commit, embedded with the latest minor+patch version of the nginx `A` major
version.
- `edge` aliases the latest `edge-nginxA.B.C` tag;

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

As an alternative to passing sensitive information via environment variables, `__FILE` may be appended to any of the listed environment variables below, causing the initialization script to load the values for those variables from files present in the container.

In particular, this can be used to load values from Docker secrets stored in `/run/secrets/<secret_name>` files. For example : `HTTP2HTTPS_REDIRECT_PORT__FILE=/run/secrets/redirect_port`.

### HTTP2HTTPS_REDIRECT_PORT

**Default**: *empty*

Configure the port used in the redirected URL. If empty, no port will be added to the URL (effectively selecting the default HTTPS port).

### HTTP2HTTPS_TEMPORARY_REDIRECT

**Format**: boolean (`0` or `1`)

**Default**: `0`

Configure if the HTTP redirect code should be a *temporary redirect* (307) instead of a *permanent redirect* (308).
