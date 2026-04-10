# HTTP to HTTPS Redirect Container Images

Container images based on the [official nginx image](https://hub.docker.com/_/nginx) that redirect all HTTP requests to their HTTPS equivalent, with a configurable target port and redirect type.

Sources are available on [GitHub](https://github.com/anthochamp/container-http-to-https).

See [README.md](README.md) for full documentation and configuration reference.

## Image tags

- `x.y.z-nginxA.B.C`: Container image version `x.y.z` with nginx `A.B.C`.
- `edge-nginxA.B.C`: Latest commit build with nginx `A.B.C`.

**Tag aliases:**

- `x.y-nginxA.B.C`: Latest patch of `x.y` with nginx `A.B.C`.
- `x-nginxA.B.C`: Latest minor+patch of `x` with nginx `A.B.C`.
- `x.y.z-nginxA.B`: Version `x.y.z` with latest patch of nginx `A.B` (only latest container version updated).
- `x.y-nginxA.B`: Latest patch of `x.y` with latest patch of nginx `A.B`.
- `x-nginxA.B`: Latest minor+patch of `x` with latest patch of nginx `A.B`.
- `x.y.z-nginxA`: Version `x.y.z` with latest minor+patch of nginx `A` (only latest container version updated).
- `x.y-nginxA`: Latest patch of `x.y` with latest minor+patch of nginx `A`.
- `x-nginxA`: Latest minor+patch of `x` with latest minor+patch of nginx `A`.
- `x.y.z`: Version `x.y.z` with latest nginx (only latest container version updated).
- `x.y`: Latest patch of `x.y` with latest nginx.
- `x`: Latest minor+patch of `x` with latest nginx.
- `nginxA.B.C`: Latest container with nginx `A.B.C`.
- `nginxA.B`: Latest container with latest patch of nginx `A.B`.
- `nginxA`: Latest container with latest minor+patch of nginx `A`.
- `latest`: Latest `x.y.z-nginxA.B.C` tag.
- `edge-nginxA.B`: Latest commit build with latest patch of nginx `A.B`.
- `edge-nginxA`: Latest commit build with latest minor+patch of nginx `A`.
- `edge`: Latest `edge-nginxA.B.C` tag.
