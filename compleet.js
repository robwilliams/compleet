(function ($) {

    var TAB_KEY = 9;
    var ESC_KEY = 27;
    var UP_KEY = 38;
    var DOWN_KEY = 40;
    var LEFT_KEY = 37;
    var RIGHT_KEY = 39;

    var cache = {};

    $.fn.compleet = function (options) {

        var settings = $.extend({
            remote:            '/search/autocomplete.json?q=',
            input_class:       'compleet',
            active_class:      'compleet-active',
            wrapper_class:     'compleet-wrapper',
            results_class:     'compleet-results',
            has_results_class: 'compleet-has-results'
        }, options);

        return this.each(function () {

            var prefix;

            var $input = $(this);
            var $wrapper = $('<div class="' + settings.wrapper_class +'">');
            var $results = $('<div class="' + settings.results_class +'">');

            $input.addClass(settings.input_class);
            $wrapper.insertAfter($input);
            $input.appendTo($wrapper);
            $results.appendTo($wrapper);

            $input.on("keyup", function () {

                if (event.keyCode == ESC_KEY) {
                    populate_search_results('', [], $results, settings);
                };

                if ($.inArray(event.keyCode, [TAB_KEY, UP_KEY, DOWN_KEY, LEFT_KEY, RIGHT_KEY]) == -1) {

                    current_prefix = $(this).val();

                    if (prefix == current_prefix) {
                        return;
                    }

                    prefix = current_prefix;

                    if (prefix == '') {
                        populate_search_results('', [], $results, settings);
                        return;
                    }

                    if (prefix in cache) {
                        populate_search_results(prefix, cache[prefix], $results, settings);
                    } else {
                      url = settings.remote + prefix;
                        $.ajax({
                            url: url,
                            success: function (data) {
                                cache[prefix] = data;
                                populate_search_results(prefix, data, $results, settings);
                            }
                        });
                    }
                }
            });

            $input.on("keydown", function () {
                
                if (event.keyCode == DOWN_KEY || event.keyCode == UP_KEY || event.keyCode == TAB_KEY) {

                  e = $.event.fix(event);
                  e.preventDefault();

                  if ($results.length == 0) {
                    populate_search_results('', [], $results, settings);
                    return;
                  }

                  if ($('.' + settings.active_class, $results).length == 0) {
                    current_result = $('p:first-child', $results).addClass(settings.active_class);
                  } else {
                    current_result = $('.' + settings.active_class, $results).removeClass(settings.active_class);
                    current_result.removeClass(settings.active_class);

                    if (event.keyCode == DOWN_KEY || event.keyCode == TAB_KEY) {
                      if (current_result.is(":last-child")) {
                        current_result = $('p:first-child', $results).addClass(settings.active_class);
                      } else {
                        current_result = current_result.next().addClass(settings.active_class);
                      }
                    }

                    if (event.keyCode == UP_KEY) {
                      if (current_result.is(":first-child")) {
                        current_result = $('p:last-child', $results).addClass(settings.active_class);
                      } else {
                        current_result = current_result.prev().addClass(settings.active_class);
                      }
                    }
                  }

                  search_text = current_result.first().text();

                  if (search_text != "") {
                    $(this).val(search_text);
                  }
                }
            });

            $results.on("mousedown", "p", function () {
              $input.val($(this).text());
              $input.closest('form').submit();
            });

            $input.on("blur", function () {
              populate_search_results('', [], $results, settings);
            });
        });
    };


    function populate_search_results(prefix, results, container, settings) {
        prefix = $.trim(prefix).toLowerCase();
        html = "";

        if (results.length == 0) {
            container.removeClass(settings.has_results_class);
        } else {
            container.addClass(settings.has_results_class);
        }

        $.each(results, function (i, item) {
            item = item.replace(RegExp("^" + prefix), '<b>' + prefix + '</b>');
            html += '<p>' + item + '</p>';
        });

        container.empty().html(html);
    };
})(jQuery);
