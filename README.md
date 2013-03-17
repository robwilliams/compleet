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

## Configuration
```javascript
$('#search input').compleet(
  remote:            '/search/autocomplete.json?q=',
  input_class:       'compleet',
  active_class:      'compleet-active',
  wrapper_class:     'compleet-wrapper',
  results_class:     'compleet-results',
  has_results_class: 'compleet-has-results'
}
```

[term-highlight]: http://compleet.s3.amazonaws.com/term-highlight.png
