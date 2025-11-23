// index.js
// 图片轮播功能
document.addEventListener('DOMContentLoaded', function() {
    // 轮播图功能
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let currentSlide = 0;
    let slideInterval;

    // 初始化轮播
    function initSlider() {
        if (slides.length === 0) return;
        
        // 显示第一张幻灯片
        slides[0].classList.add('active');
        dots[0].classList.add('active');
        
        // 设置自动轮播
        slideInterval = setInterval(nextSlide, 5000);
    }

    // 切换到下一张幻灯片
    function nextSlide() {
        goToSlide((currentSlide + 1) % slides.length);
    }

    // 切换到上一张幻灯片
    function prevSlide() {
        goToSlide((currentSlide - 1 + slides.length) % slides.length);
    }

    // 跳转到指定幻灯片
    function goToSlide(n) {
        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');
        currentSlide = n;
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    // 事件监听
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    
    // 为每个点添加点击事件
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            clearInterval(slideInterval);
            goToSlide(index);
            slideInterval = setInterval(nextSlide, 5000);
        });
    });
    
    // 初始化轮播
    initSlider();

    // 移动端菜单切换
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // 点击导航链接关闭菜单
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // 导航栏滚动效果
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.padding = '10px 0';
            navbar.style.background = 'rgba(10, 10, 18, 0.95)';
        } else {
            navbar.style.padding = '15px 0';
            navbar.style.background = 'rgba(10, 10, 18, 0.9)';
        }
    });

    // 按钮点击效果
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('mousedown', function() {
            this.style.transform = 'scale(0.95)';
        });
        
        button.addEventListener('mouseup', function() {
            this.style.transform = '';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });

    // 表单提交
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('感谢您的留言！我们会尽快与您联系。');
            this.reset();
        });
    }
});

// 兑换码验证功能
document.addEventListener('DOMContentLoaded', function() {
    const redeemInput = document.getElementById('redeem-code');
    const redeemSubmit = document.getElementById('redeem-submit');
    const modal = document.getElementById('redeem-modal');
    const closeBtn = document.querySelector('.close');
    let validCodes = [];
    
    
    
    // 嵌入式兑换码（备用）
    const embeddedCodes = [
        '389472',
		'156829',
		'734016',
		'982345',
		'567128',
		'410973',
		'825691',
		'293784',
		'648052',
		'971463',
		'352790',
		'816254',
		'479031',
		'625178',
		'903467',
		'138529',
		'764082',
		'591736',
		'207895',
		'436910'
    ];
    
    // 加载兑换码文件
    function loadRedeemCodes() {
        const filePaths = [
            '兑换码.txt',
            './兑换码.txt',
            'duihuanma.txt'
        ];
        
        function tryLoad(pathIndex) {
            if (pathIndex >= filePaths.length) {
                // 所有路径都尝试失败，使用嵌入式兑换码
                console.warn('所有兑换码文件加载尝试失败，使用嵌入式兑换码');
                validCodes = embeddedCodes;
                return;
            }
            
            const filePath = filePaths[pathIndex];
            console.log(`尝试加载兑换码文件: ${filePath}`);
            
            fetch(filePath)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.text();
                })
                .then(data => {
                    validCodes = data.split('\n')
                        .map(code => code.trim())
                        .filter(code => code !== '');
                    
                    console.log(`成功从 ${filePath} 加载 ${validCodes.length} 个兑换码`);
                })
                .catch(error => {
                    console.warn(`加载 ${filePath} 失败:`, error);
                    tryLoad(pathIndex + 1);
                });
        }
        
        tryLoad(0);
    }
    
    // 初始化加载兑换码
    loadRedeemCodes();
    
    // 提交兑换码
    redeemSubmit.addEventListener('click', function() {
        const inputCode = redeemInput.value.trim();
        
        if (!inputCode) {
            alert('请输入兑换码');
            redeemInput.focus();
            return;
        }
        
        if (validCodes.length === 0) {
            alert('系统正在加载兑换码数据，请稍后重试');
            return;
        }
        
        
        if (validCodes.includes(inputCode)) {
            // 兑换成功
            
            modal.style.display = 'block';
            redeemInput.value = '';
            console.log(`兑换码 "${inputCode}" 兑换成功`);
        } else {
            alert('兑换码无效，请检查后重试');
            redeemInput.select();
        }
    });
    
    // 关闭弹窗
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    // 点击弹窗外部关闭
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // 按回车键提交
    redeemInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            redeemSubmit.click();
        }
    });
});