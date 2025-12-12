document.addEventListener('DOMContentLoaded', () => {
    const scrollBtn = document.querySelector('.scroll-top');
    if (!scrollBtn) return;
  
    const toggleScrollBtn = () => {
      if (window.scrollY > 200) {
        scrollBtn.classList.add('visible');
      } else {
        scrollBtn.classList.remove('visible');
      }
    };
  
    window.addEventListener('scroll', toggleScrollBtn);
    scrollBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  
    toggleScrollBtn();
  });
  
  