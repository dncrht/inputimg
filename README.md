# InputImg

InputImg is a jQuery UI widget that improves the traditional input type="file" that browsers show.

The stock widget has some cons:

* unstyleable
* no preview
* if you want to delete your selection, you need to click as if you intended to select another file but then click Cancel

InputImg replaces it with:

* a single add button
* a image preview (only in Chrome, Firefox, Opera)
* file name (every browser) and size (Safari, Chrome, Firefox, Opera)
* cancel button

Requires jquery.ui.base and jquery.ui.widget . Successfully tested under Chrome, Firefox, Opera, Safari and IE*

If you use Papereclip to manage your file uploads, it can also add a handy checkbox to notify the server the image deletion.

## Try it!

```javascript
    $('input[type=file]').inputimg();
```

To include the Delete checkbox:
```javascript
    $('input[type=file]').inputimg({paperclipDelete: true});
```

Given your original input tag:

```html
<input type="file" class="class1 class2" data-src="/path/to/image">
```

After widget initialization, several DOM elements are added:

```html
<button type="button">Add</button> <!-- click to add a file -->
<p>
    <button type="button">Cancel</button> <!-- click to cancel your file selection -->
    <span></span> <!-- selected file name and size -->
</p>
<input type="file" name="model[field]" class="class1 class2" data-src="/path/to/image"> <!-- the original input, now hidden -->
<div class="class1 class2">
    <img src="/path/to/image">
    <p><label><input type="checkbox" name="model[paperclip_delete_field]" value="1"> Delete original image</label></p> <!-- paperclip's checkbox -->
</div>
```

The input tag may be declared in your server side language as:

```ruby
    #this would be on Rails
    <%= f.file_field :image, :class => 'thumbnail', 'data-src' => @item.image %>
```

If you don't want a div tag to hold the image, invoke plugin with:

```javascript
    $('input[type=file]').inputimg({wrapper: 'figure'});
```

By default, this widget restricts image size up to 5 Megabytes, but it's just an option:

```javascript
    $('input[type=file]').inputimg({maxSize: 1000000});
```
Set to 0 to disable size checking.

You can also change the text of the buttons. Add this code before using the plugin:
```javascript
$.ui.inputimg.prototype.captions = {
    add: 'Añadir',
    cancel: 'Cancelar',
    deleteOriginal: 'Borrar imagen original'
};
```

References:

* https://developer.mozilla.org/en-US/docs/DOM/FileReader
* http://www.inwebson.com/html5/html5-drag-and-drop-file-upload-with-canvas/
* http://blueimp.github.com/jQuery-File-Upload/
* http://net.tutsplus.com/tutorials/javascript-ajax/coding-your-first-jquery-ui-plugin/
* http://bililite.com/blog/understanding-jquery-ui-widgets-a-tutorial/

