# README

Do not install this! This is radioactive; it's a weekend project with no coe review and no security checks.

### Install

### Run

node bin/index.js

### Made with

- [node CLI for beginners](https://developer.okta.com/blog/2019/06/18/command-line-app-with-nodejs#build-your-first-nodejs-command-line-application)
- terminal-kit
- Love

### Nice examples

- Nice: degas, klimt, Salvador Dali, magritte
- Very nice: Edvard Munch[0] hokusai, wharol, monet#1, mondrian#4, vangogh#4, picasso#4, kahlo#2 or #4, edward hopper#1

### Edge cases

Edge cases supported:

- Page is not an artist page
- Page not found
- Page is an artist page but contains no artwork list

Not supported:
// in case we overflow this table like for degas
// const blaaa = artworksHtml.indexOf("</tr>");
// console.log(blaaa);
// artwork page is accessible but there's another image in there, typos
// bug: vermeer, picasso (displays a small image)
// If other issue, pick another artist.
