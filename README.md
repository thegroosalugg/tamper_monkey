# tamper_monkey
custom scripts for common websites

## dev server
- custom server for development testing scripts on localhost
  - discards cache so code changes are updated instantly in browser
- configure port, path & allowed sites manually at the start of script

## clean url
- remove junk from parameters for clean copyable URLs

## darkmode
- simple dark mode to add to sites that don't have their own media query

## job filter
- filter to remove job search results by filter
  - currently manual: add site domain & filtered terms to TM script - requires < li > className
- works with general HTML layout (li > h2) on StepStone and Indeed

## linkedin
- filter nav items: manual - add terms to array

## overflow
- simple observer that removes body: overflow hidden from sites whenever they try to apply it to prevent scrolling

## xbox
- removes certain intrusive elements when streaming games on xCloud
  - press F9 to release mouse
  - click or tap here to continue playing
