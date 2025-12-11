# ArtaferaFrontend

### The frontent for the <a href="https://www.Artafera.ch">Artafera Website</a>

## Development

To start the Artafera frontend you the following things:

- Angular 20.3 or higher 
- Bun 
- Node

Run `bun install` to install all dependency's and afterward run `ng serve` to start the webserver (Non SSR). To Test with SSR run `bun run build` and then `bun run serve:ssr`

## Production

For production you additionally need:
- Docker engine or Docker desktop (idk which version, I have 28.5)

For prod either build the docker image locally or pull it from the repo.
