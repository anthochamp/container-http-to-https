# HTTP to HTTPS redirect Web Server container images

Container images based on the [official nginx image](https://hub.docker.com/_/nginx) which respond to any request made on it (HTTP or HTTPS schemes) with a redirect to an equivalent URL with a HTTPS scheme and a configurable port.

Sources are available on [GitHub](https://github.com/anthochamp/container-http-to-https).

## Image tags

- `x.y.z`, `x.y` and `x` tags releases on multiple semver levels
- `latest` tags the latest release
- `edge` tags the image build automatically on the latest Git commit

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
