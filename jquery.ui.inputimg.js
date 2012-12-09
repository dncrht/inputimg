/*
  jQuery UI InputImg Plugin 0.0.1
  https://github.com/dncrht/inputimg

  Copyright (c) 2012 Daniel Cruz Horts

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in
  all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
  THE SOFTWARE.
 */


(function($) {

    $.widget('ui.inputimg', {

        options: {
            wrapper: 'div',
            maxSize: 5242880
        },

        _create: function() {
            
            var that = this,
                src = this.element.data('src'),
                clazz = this.element.attr('class');

            //
            // Compose additional DOM elements
            //

            this.element.hide();

            clazz = (clazz == undefined) ? '' : ' class="' + clazz + '"';
            var wrapper = $('<' + this.options.wrapper + clazz + '></' + this.options.wrapper + '>');
            this.element.after(wrapper);

            // By reading wrapper width and reapplying it to the image we can make any image fit, regardless the real image size
            src = (src == undefined) ? '' : src;
            var img = $('<img src="' + src + '" width="' + wrapper.width() + '" />');
            wrapper.append(img);

            var button_add = $('<button type="button" class="btn">+</button>');
            this.element.before(button_add);
            
            var file_info = $('<p><span></span></p>');
            var button_cancel = $('<button type="button" class="btn">x</button>');

            file_info.prepend(button_cancel);
            button_add.after(file_info);
            
            button_add.click(function() {
                that.element.click();
            });

            file_info.hide();
            
            //
            // Glue them with some logic
            //

            button_cancel.click(function() {
                that._cancel(img, src, file_info);
            });

            this.element.change(function() {
                // $('#input_id')[0].files returns a FileList
                // It works like document.getElementById('input_id').files
                var files = that.element[0].files;
                
                if (files.length == 1) {
                    var file = files[0];
                    
                    // Check file type
                    if (/^image\/(gif|jpe?g|png)$/.test(file.type) == false) {
                        that._cancel(img, src, file_info);
                        return;
                    }

                    // Check file size
                    if (that.options.maxSize > 0 && file.size > that.options.maxSize) {
                        that._cancel(img, src, file_info);
                        return;
                    }

                    // If browser supports FileReader, show an image preview.
                    // This is the only way to read original file because the browser cannot access C:\Fakepath
                    if (!!window.FileReader) {

                        var fr = new FileReader();

                        fr.onload = function(event) {
                            img.attr('src', event.target.result);
                        };

                        fr.readAsDataURL(file);

                    }

                    // Show us name and size
                    file_info.find('span').html(file.name + ' (' + that._formatFileSize(file.size) + ')');
                    file_info.show();

                } else {
                    that._cancel(img, src, file_info);
                }
            });

        },
        
        _cancel: function(img, src, file_info) {
                img.attr('src', src);
                file_info.hide();
                this.element.val(null);
        },
        
        _setOption: function( key, value ) {},

        _formatFileSize: function(bytes) {
            if (typeof bytes !== 'number') {
                return '';
            }
            if (bytes >= 1073741824) {
                return (bytes / 1073741824).toFixed(2) + ' GB';
            }
            if (bytes >= 1048576) {
                return (bytes / 1048576).toFixed(2) + ' MB';
            }
            return (bytes / 1024).toFixed(2) + ' KB';
        },

        _destroy: function() {
            this.element.next().remove(); // Refers to wrapper and image
            this.element.prev().remove(); // Refers to file info
            this.element.prev().remove(); // Refers to add button
            this.element.show(); // Former input is shown again
        }
    });
})(jQuery);

