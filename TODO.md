# TODOs

## Doc

- Add a bugfix mode that logs the error
- Exit on command C

## Doc

- Say "Do not install"
- Document how to install (see README)
- Blogpost so I can remember the bugs

## Security

- Sanitize user input

## Code quality

- remove unneccessary code from utils
- Move out of bin?
- Alternative to accessing exports inline? `.then((html) => scrape.getArtworkWikiPagePathFromArtistPageHtml(html));`
- Add prettier
- Better async management: then or awaits everywhere
- [DONE] Better error management
- [NO] TypeScript

## Tests

- Add a few tests e.g. van gogh

## Bugfix

- See all default artists and bugs that happen with these
- Fail more gracefully: if no artwork list but it is an artist, take image from page.
- Monet bug
  🎨 Artist?
  monet
  Looking...//upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Wheatstacks*%28End_of_Summer%29%2C_1890-91*%28190*Kb%29%3B_Oil_on_canvas%2C_60_x_100_cm*%2823*5-8_x_39_3-8_in%29%2C_The_Art_Institute_of_Chicago.jpg/280px-Wheatstacks*%28End*of_Summer%29%2C_1890-91*%281
  Error: Bad image URL: Error: Unsupported file type: text/html; charset=utf-8💥 Uuh crashed while painting, look away and pretend nothing happened!%
- Dali Bug (not an artist page, land on disambiguation)
- [DONE] Proper process exit

## Features

- "More from this artist"
- "More from similar artists"
- Game mode!!!
- Display full URL for people to check out
- Use terminal-kit table to display the title
- Pick a genre
- [NO] Bigger/Smaller image? Better viewportfit? Center?
- [NO] Display animation WHILE img load
- [NO] Fit the frame nicely to the picture / Add funky frame all around
- [DONE] When "enter" (empty input), pick an artist instead of ""\nOh no, that's empty or contains special characters 😳. Try again!\n"
- [DONE] Mode without manual input for artist (just pick one!)
- [DONE] Fallbackk === Random artist instead of always Van Gogh
- [DONE] "Continue" mode
- [NO] Support exit via command C
- [NO] Wait between 2 "Artist?" prints

  // console.log(artworkWikiPagePath);
  // where does this error come from exactly??
  // GOOD:
  // const artworkWikiPagePath = '/wiki/Chop*Suey*(painting)';
  // BAD:
  // const artworkWikiPagePath = '/wiki/Evening;_Red_Tree';
  // const idxRandom = Math.floor(Math.random() \* 2);
  // const paths = ['/wiki/Chop_Suey_(painting)', '/wiki/Evening;\_Red_Tree'];
  // const artworkWikiPagePath = paths[idxRandom];
