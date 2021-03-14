# TODO

**Doc:**

- Document how to install (see README)

**Code quality:**

- Move out of bin?
- Alternative to accessing exports inline? `.then((html) => scraper.getArtworkWikiPagePathFromArtistPageHtml(html));`
- Add prettier
- Better async management
- TypeScript

**Tests:**

- Add a few tests: van gogh

**Bugfix:**

- See all default artists and bug that happen with these
- Proper process exit
- Monet bug
  🎨 Artist?
  monet
  Looking...//upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Wheatstacks*%28End_of_Summer%29%2C_1890-91*%28190*Kb%29%3B_Oil_on_canvas%2C_60_x_100_cm*%2823*5-8_x_39_3-8_in%29%2C_The_Art_Institute_of_Chicago.jpg/280px-Wheatstacks*%28End*of_Summer%29%2C_1890-91*%281
  Error: Bad image URL: Error: Unsupported file type: text/html; charset=utf-8💥 Uuh crashed while painting, look away and pretend nothing happened!%
- Dali Bug (not an artist page, land on disambiguation)

**Features:**

- Random artist instead of always Van Gogh
- "Continue" mode
- Bigger/Smaller image? Better viewportfit? Center?
- Add frame
- Display animation WHILE img load
- Mode with artist as command line argument
- Fail more gracefully: if no artwork list but it's an artist, take image from page.
- [DONE] When "enter" (empty input), pick an artist instead of ""\nOh no, that's empty or contains special characters 😳. Try again!\n"
- [DONE] Mode without manual input for artist (just pick one!)
