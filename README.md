# InputImg

InputImg is a jQuery UI widget that improves the traditional input type="file" that browsers show.

The stock widget has some cons:

* unstyleable
* no preview
* if you want to delete your selection, you need to click as if you intended to select another file but then click Cancel

InputImg replaces it with:

* a single add button
* a image preview (browser dependent)
* file name and size
* cancel button

## Try it!

```javascript
$('input[type=file]').inputimg();
```

Requires jquery.ui.base and jquery.ui.widget . Successfully tested under Chrome, Firefox, Opera, Safari and IE*

Given your original input tag:

```html
 <input type="file" class="class1 class2" data-src="/path/to/image">
```

After widget initialization, several DOM elements are added:

```html
 <button type="button">+</button> <!-- click to add a file -->
 <p>
     <button type="button">x</button> <!-- click to cancel your file selection -->
     <span></span> <!-- selected file name and size -->
 </p>
 <input type="file" class="class1 class2" data-src="/path/to/image"> <!-- the original input, now hidden -->
 <figure class="class1 class2">
     <img src="/path/to/image">
 </figure>
```

The input tag may be declared in your server side language as:

```ruby
    #Rails
    <%= f.file_field :image, :class => 'thumbnail', 'data-src' => @item.image %>
```

If you don't want a figure tag to hold the image, invoke plugin with:

```javascript
    $('input[type=file]').inputimg({wrapper: 'div'});
```

By default, this widget restricts image size up to 5 Megabytes, but it's just an option:

```javascript
    $('input[type=file]').inputimg({maxSize: 1000000});
```
Set to 0 to disable size checking.

References:

* https://developer.mozilla.org/en-US/docs/DOM/FileReader
* http://www.inwebson.com/html5/html5-drag-and-drop-file-upload-with-canvas/
* http://blueimp.github.com/jQuery-File-Upload/
* http://net.tutsplus.com/tutorials/javascript-ajax/coding-your-first-jquery-ui-plugin/
* http://bililite.com/blog/understanding-jquery-ui-widgets-a-tutorial/

