<template>
  <div class="quill-editor"></div>
</template>
<script>
  export default {
    name: 'quill-editor',
    data() {
      return {
        _content: '',
        defaultModules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ 'header': 1 }, { 'header': 2 }],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            [{ 'script': 'sub'}, { 'script': 'super' }],
            [{ 'indent': '-1'}, { 'indent': '+1' }],
            [{ 'direction': 'rtl' }],
            [{ 'size': ['small', false, 'large', 'huge'] }],
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'font': [] }],
            [{ 'align': [] }],
            ['clean'],
            ['link', 'image', 'video']
          ]
        }
      }
    },
    props: {
      content: String,
      value: String,
      options: {
        type: Object,
        required: false,
        default() {
          return {}
        }
      }
    },
    mounted() {
      this.initialize()
    },
    beforeDestroy() {
      this.quill = null
    },
    methods: {
      initialize() {
        if (this.$el) {

          // options and instance
          var self = this
          self.options.theme = self.options.theme || 'snow'
          self.options.boundary = self.options.boundary || document.body
          self.options.modules = self.options.modules || self.defaultModules
          self.options.modules.toolbar = self.options.modules.toolbar || self.defaultModules.toolbar
          self.options.placeholder = self.options.placeholder || 'Insert text here ...'
          self.options.readOnly = self.options.readOnly !== undefined ? self.options.readOnly : false
          self.options.modules.toolbar = self.options.modules.toolbar || defaultOptions.modules.toolbar
          self.quill = new Quill(self.$el, self.options)

          // set editor content
          if (self.value || self.content) {
            self.quill.pasteHTML(self.value || self.content)
          }

          // mark model as touched if editor lost focus
          self.quill.on('selection-change', (range) => {
            if (!range) {
              self.$emit('blur', self.quill)
            } else {
              self.$emit('focus', self.quill)
            }
          })

          // update model if text changes
          self.quill.on('text-change', (delta, oldDelta, source) => {
            var html = self.$el.children[0].innerHTML
            const text = self.quill.getText()
            if (html === '<p><br></p>') html = ''
            self._content = html
            self.$emit('input', self._content)
            self.$emit('change', {
              editor: self.quill,
              html: html,
              text: text
            })
          })

          // emit ready
          self.$emit('ready', self.quill)
        }
      }
    },
    watch: {
      'content'(newVal, oldVal) {
        if (this.quill) {
          if (!!newVal && newVal !== this._content) {
            this._content = newVal
            this.quill.pasteHTML(newVal)
          } else if(!newVal) {
            this.quill.setText('')
          }
        }
      },
      'value'(newVal, oldVal) {
        if (this.quill) {
          if (newVal !== this._content) {
            this._content = newVal
            this.quill.pasteHTML(newVal)
          } else if(!newVal) {
            this.quill.setText('')
          }
        }
      }
    }
  }
</script>

<style>
  .quill-editor img {
    max-width: 100%;
  }

  .ql-snow .ql-color-picker .ql-picker-options{
    width: 153px;
  }
</style>
