<p align="center">
  <img src="https://raw.githubusercontent.com/BananoCoin/boompow-next/master/logo.svg" width="300">
</p>

This is the website for the distributed proof of work system for the [BANANO](https://banano.cc) and [NANO](https://nano.org) cryptocurrencies.

Created by [https://github.com/Klicer](Klicer)

## What is It?

This is the user-facing webapp for [BoomPoW](https://boompow.banano.cc).

For the backend and server, see the [BoomPoW GitHub](https://github.com/BananoCoin/boompow)

## Contributing

To contribute, fork the repository, make your changes, and create a pull-request.

Development is made easy with a docker development environment. Some aliases you may find convenient to add to `~/.zshrc`  or `~/.bashrc`

```
alias dcup="docker-compose up -d"
alias dcdown="docker-compose down"
alias dcbuild="docker-compose build"
alias dczsh="docker-compose exec app /bin/zsh"
alias dcps="docker-compose ps"
alias dcnpm="docker-compose exec app npm
```

To get started:

```
dcup
dcnpm install
dcnpm start # Starts the server in development mode
```

Access at `http://localhost:3002`

## Issues

For issues, create tickets on the [Issues Page](https://github.com/bananocoin/boompow-frontend/issues)

The [BANANO discord server](https://chat.banano.cc) has a channel dedicated to to boompow if you have general questions about the service.
