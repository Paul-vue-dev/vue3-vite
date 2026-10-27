<script setup>
import { component as ckeditor } from '@ckeditor/ckeditor5-vue'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

defineProps({
  disabled: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['ready', 'foucs', 'blur', 'input', 'destroy'])
const editor = ClassicEditor;

const editorConfig = {
  language: 'ko',
  toolbar: {
    items: [
      'heading',
      '|',
      'bold',
      'italic',
      'link',
      '|',
      '|',
      'bulletedList',
      'numberedList',
      '|',
      'outdent',
      'indent',
      '|',
      'imageUpload',
      'blockQuote',
      'insertTable',
      'mediaEmbed',
      '|',
      'undo',
      'redo'
    ]
  },
  // CKEditor 로고 및 "Powered by CKEditor" 제거
  removePlugins: [
    'EasyImage', 
    'BalloonToolbar', 
    'CKFinder', 
    'CKFinderUploadAdapter', 
    'CloudServices',
    'CKBox', // CKBox 플러그인 제거
    'RealTimeCollaborativeEditing', // 실시간 협업 관련 플러그인 제거
    'RealTimeCollaborativeComments',
    'RealTimeCollaborativeTrackChanges',
    'LicenseBanner' // 라이선스 배너 제거
  ],
};

const onEditorReady = () => {
  emit('ready');
};

const onEditorFoucs = () => {
  emit('foucs');
};

const onEditorBlur = () => {
  emit('blur');
};

const onEditorInput = () => {
  emit('input');
};

const onEditorDestroy = () => {
  emit('destroy');
};
</script>

<template>
  <div id="ckeditor">
    <ckeditor
      :editor="editor"
      :config="editorConfig"
      :disabled="disabled"
      @ready="onEditorReady"
      @foucs="onEditorFoucs"
      @blur="onEditorBlur"
      @input="onEditorInput"
      @destroy="onEditorDestroy"
    />
    <!-- v-model="editorResult" -->
  </div>
</template>

<style scoped>
#ckeditor :deep(.ck-editor__editable) {
  min-height: 200px;
  max-height: 500px;
  color: #1a202c;
}
</style>
