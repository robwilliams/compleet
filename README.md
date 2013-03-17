# Compleet.js

Yet another jQuery autocomplete plugin. Highly inspired by Amazon's main search autocomplete.

## Features

Term Highlighting

![alt text][term-highlight]

## Usage

```javascript
$(function () {
  $('#search input').compleet();
});
```

Compleet expects a json response from the ```remote:``` location in the following format:

```javascript
["term", "term2", "term3"]
```

## Configuration
```javascript
$('#search input').compleet(
  // Search prefix is added to the end of remote url
  // i.e. /search/autocomplete.json?q=hik for the prefix 'hik'
  remote:            '/search/autocomplete.json?q=',
  
  // All classes that the plugin adds can be overridden (these are the defaults)
  input_class:       'compleet',
  active_class:      'compleet-active',
  wrapper_class:     'compleet-wrapper',
  results_class:     'compleet-results',
  has_results_class: 'compleet-has-results'
}
```

## FAQ
### What does it do to my text input box?

I'm glad you asked... When compleet is applied to an input box it makes a few small changes to the DOM to allow
it to work. 

Compleet will change:

```html
<input type="text" id="search-box-input" name="q">
```

To:

```html
<div class="compleet-wrapper">
<input type="text" id="search-box-input" class="compleet" name="q">
<div class="compleet-results"></div>
</div>
```

The outer wrapper is required to allow the results to be positioned below the input box.

When results are returned (when entering a search query), the results div will have ```.compleet-has-results``` applied to it.

```html
<div class="compleet-wrapper">
<input type="text" id="search-box-input" class="compleet" name="q">
<div class="compleet-results compleet-has-results">
  <p>a<p>
  <p>ab<p>
  <p>abc<p>
</div>
</div>
```

[term-highlight]: http://compleet.s3.amazonaws.com/term-highlight.png
