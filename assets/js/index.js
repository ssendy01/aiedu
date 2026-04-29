/**
 * 배움과나눔 안전연구소 × 미라클 K-디지털 AI 교육
 * Main JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {

  // ==================== 1. 스무스 스크롤 ====================
  const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');

  smoothScrollLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');

      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        e.preventDefault();

        const headerHeight = document.querySelector('.site-header').offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });

        // 모바일 메뉴 닫기
        const menu = document.querySelector('.site-header .menu');
        const menuToggle = document.querySelector('.menu-toggle');
        if (menu && menu.classList.contains('active')) {
          menu.classList.remove('active');
          menuToggle.classList.remove('active');
        }
      }
    });
  });

  // ==================== 2. 모바일 메뉴 토글 ====================
  const menuToggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.site-header .menu');

  if (menuToggle && menu) {
    menuToggle.addEventListener('click', function() {
      menu.classList.toggle('active');
      this.classList.toggle('active');
    });

    // 메뉴 외부 클릭 시 닫기
    document.addEventListener('click', function(e) {
      if (!menuToggle.contains(e.target) && !menu.contains(e.target)) {
        menu.classList.remove('active');
        menuToggle.classList.remove('active');
      }
    });
  }

  // ==================== 3. FAQ 아코디언 ====================
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');

    question.addEventListener('click', function() {
      const isActive = item.classList.contains('active');

      // 모든 FAQ 아이템 닫기
      faqItems.forEach(faq => {
        faq.classList.remove('active');
      });

      // 클릭한 아이템만 열기 (이미 열려있던 것을 다시 클릭한 경우는 닫힌 상태 유지)
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // ==================== 4. 폼 유효성 검사 및 제출 ====================

  // 개인 신청 폼
  const individualForm = document.getElementById('individual-form');
  if (individualForm) {
    individualForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const name = document.getElementById('ind-name').value.trim();
      const phone = document.getElementById('ind-phone').value.trim();
      const email = document.getElementById('ind-email').value.trim();
      const status = document.getElementById('ind-status').value;
      const message = document.getElementById('ind-message').value.trim();

      // 유효성 검사
      if (!name || !phone || !email || !status) {
        alert('필수 항목을 모두 입력해주세요.');
        return;
      }

      // 이메일 형식 검사
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        alert('올바른 이메일 주소를 입력해주세요.');
        return;
      }

      // 전화번호 형식 검사 (간단한 검사)
      const phonePattern = /^[0-9-]+$/;
      if (!phonePattern.test(phone)) {
        alert('올바른 전화번호를 입력해주세요.');
        return;
      }

      // 실제 서버로 전송하는 코드는 여기에 추가
      // 예: fetch('/api/individual-apply', { method: 'POST', body: JSON.stringify({ name, phone, email, status, message }) })

      alert('신청이 접수되었습니다.\n담당자가 빠른 시일 내에 연락드리겠습니다.');
      individualForm.reset();
    });
  }

  // 기관 문의 폼
  const institutionForm = document.getElementById('institution-form');
  if (institutionForm) {
    institutionForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const org = document.getElementById('inst-org').value.trim();
      const name = document.getElementById('inst-name').value.trim();
      const phone = document.getElementById('inst-phone').value.trim();
      const email = document.getElementById('inst-email').value.trim();
      const type = document.getElementById('inst-type').value;
      const message = document.getElementById('inst-message').value.trim();

      // 유효성 검사
      if (!org || !name || !phone || !email || !type || !message) {
        alert('필수 항목을 모두 입력해주세요.');
        return;
      }

      // 이메일 형식 검사
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        alert('올바른 이메일 주소를 입력해주세요.');
        return;
      }

      // 전화번호 형식 검사
      const phonePattern = /^[0-9-]+$/;
      if (!phonePattern.test(phone)) {
        alert('올바른 전화번호를 입력해주세요.');
        return;
      }

      // 실제 서버로 전송하는 코드는 여기에 추가
      // 예: fetch('/api/institution-inquiry', { method: 'POST', body: JSON.stringify({ org, name, phone, email, type, message }) })

      alert('문의가 접수되었습니다.\n담당자가 빠른 시일 내에 연락드리겠습니다.');
      institutionForm.reset();
    });
  }

  // ==================== 5. 스크롤 시 헤더 그림자 효과 ====================
  const header = document.querySelector('.site-header');

  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      header.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
    } else {
      header.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
    }
  });

  // ==================== 6. 전화번호 자동 하이픈 ====================
  const phoneInputs = document.querySelectorAll('input[type="tel"]');

  phoneInputs.forEach(input => {
    input.addEventListener('input', function(e) {
      let value = e.target.value.replace(/[^0-9]/g, '');
      let formattedValue = '';

      if (value.length <= 3) {
        formattedValue = value;
      } else if (value.length <= 7) {
        formattedValue = value.slice(0, 3) + '-' + value.slice(3);
      } else if (value.length <= 11) {
        formattedValue = value.slice(0, 3) + '-' + value.slice(3, 7) + '-' + value.slice(7);
      } else {
        formattedValue = value.slice(0, 3) + '-' + value.slice(3, 7) + '-' + value.slice(7, 11);
      }

      e.target.value = formattedValue;
    });
  });

  // ==================== 7. 애니메이션 효과 (선택 사항) ====================
  // Intersection Observer를 사용한 스크롤 애니메이션
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // 애니메이션을 적용할 요소들
  const animatedElements = document.querySelectorAll('.card, .course-step, .pain-item, .eligible-item');

  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
  });

});
