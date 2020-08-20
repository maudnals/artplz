backlog.md

// bug monet#4 (paint crash)
// fixed: dali (not an artist page, land on disambiguation)
// bug: vermeer, picasso (displays a small image)
// OK: degas, klimt, Salvador Dali, magritte
// OMG so nice: Edvard Munch[0] hokusai, wharol, monet#1, mondrian#4, vangogh#4, picasso#4, kahlo#2 or #4, edward hopper#1,
// TODO add prettier
// TODO enable mode without selecting artist
// TODO: fail more gracefully: if no artwork list but it's an artist, take image from page.
// If other issue, pick another artist.
// TODO display anmation WHILE img load
// TODO: throw instead of process.exit()
// TODO clean code

// TODO
// in case we overflow this table like for degas
// const blaaa = artworksHtml.indexOf("</tr>");
// console.log(blaaa);

// supported: page not an artist page, page or not found, page is an artist page but contains no artwork list,
// artwork page is accessible but there's another image in there, typos
