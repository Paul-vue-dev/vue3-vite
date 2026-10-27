<template>
  <h4>VueSweetalert2</h4>
  <button @click="showAlert('swal')">확인</button>
  <button @click="showConfirmation('swal')">컨펌</button>
</template>

<script setup lang="ts">
import Swal from 'sweetalert2'; // SweetAlert2 직접 가져오기

const showAlert = (type: any) => {
  if (type === 'swal') {
    Swal.fire({
      title: '안녕하세요!',
      text: '이 팝업은 커스텀 애니메이션을 사용합니다.',
      icon: 'info',
      buttonsStyling: false, // SweetAlert2 기본 버튼 스타일 비활성화
    });
  }
};

const showConfirmation = (type: any) => {
  if (type === 'swal') {
    Swal.fire({
      title: '확인',
      text: '정말로 삭제하시겠습니까?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '네, 삭제할게요!',
      cancelButtonText: '아니요, 취소할게요!',
      showClass: {
        popup: 'animate__animated animate__fadeInDown', // 팝업 표시 애니메이션
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp', // 팝업 숨김 애니메이션
      },
      customClass: {
        confirmButton: 'custom-confirm-button', // 확인 버튼 클래스
        cancelButton: 'custom-cancel-button',   // 취소 버튼 클래스 (필요 시)
      },
      buttonsStyling: false, // SweetAlert2 기본 버튼 스타일 비활성화
    }).then((result: any) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: '삭제 완료!',
          text: '성공적으로 삭제되었습니다.',
          // icon: 'success',
          showClass: {
            popup: 'animate__animated animate__zoomIn', // 팝업 표시 애니메이션
          },
          hideClass: {
            popup: 'animate__animated animate__zoomOut', // 팝업 숨김 애니메이션
          },
          customClass: {
            confirmButton: 'custom-confirm-button', // 확인 버튼 클래스
          },
          buttonsStyling: false, // SweetAlert2 기본 버튼 스타일 비활성화
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          title: '삭제 취소',
          text: '취소되었습니다.',
          // icon: 'error',
          showClass: {
            popup: 'animate__animated animate__zoomIn', // 팝업 표시 애니메이션
          },
          hideClass: {
            popup: 'animate__animated animate__zoomOut', // 팝업 숨김 애니메이션
          },
          customClass: {
            cancelButton: 'custom-cancel-button', // 취소 버튼 클래스
          },
        });
      }
    });
  } else {
    alert(  '확인 버튼 클릭');
  }
};
</script>

<style>
/* 확인 버튼 스타일 */
.custom-confirm-button {
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}

.custom-confirm-button:hover {
  background-color: #0056b3;
}

/* 취소 버튼 스타일 (필요 시) */
.custom-cancel-button {
  background-color: #ccc;
  color: black;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}

.custom-cancel-button:hover {
  background-color: #999;
}
</style>