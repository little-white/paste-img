(function() {

    function isImg(item) {
        return item.kind === 'file' && item.type.indexOf('image/') !== -1;
    }

    function PasteImg(option) {
        var _self = this;
        this.element = option.element;
        document.querySelector(this.element).onpaste = onpaste;

        function onpaste(event) {
            var items = event.clipboardData.items;
            Array.prototype.slice.apply(items).forEach(function(item, index) {
                if (isImg(item)) {
                    var fileReader = new FileReader();
                    var file = item.getAsFile();
                    fileReader.onloadend = function(e) {
                        var url = '';
                        // 一种是url 不过有兼容问题
                        // 一种是base64 应该都支持 ^_^
                        if (option.isUrl) {
                            window.URL = window.URL || window.webkitURL;
                            url = window.URL.createObjectURL(file);
                        } else {
                            url = e.target.result || fileReader.result;
                        }
                        var img = new Image();
                        img.src = url;

                        // if (option.show) {
                        //     document.querySelector(_self.element).appendChild(img);
                        // }

                        img.onload = function() {
                            option.callback(img, file);
                        }
                    }
                    fileReader.readAsDataURL(file);
                }
            })

        }

    }

    window.PasteImg = PasteImg;
})();
