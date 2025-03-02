import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-landingpage',
  standalone: true,
  imports: [],
  templateUrl: './landingpage.component.html',
  styleUrl: './landingpage.component.css'
})
export class LandingpageComponent implements OnInit{
  constructor() { }

  ngOnInit(): void {
    // Initialize animations and sliders on page load
    this.initializeAnimations();
    this.initializeCounterAnimation();
    
    // Add Font Awesome script if not already present
    if (!document.getElementById('fontawesome-script')) {
      const script = document.createElement('script');
      script.id = 'fontawesome-script';
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/js/all.min.js';
      script.defer = true;
      document.head.appendChild(script);
    }
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    // Handle navbar style changes on scroll
    const navbar = document.querySelector('.navbar') as HTMLElement;
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    
    // Check for elements to animate on scroll
    this.animateOnScroll();
  }

  // Initialize animation classes
  private initializeAnimations(): void {
    // Remove 'animated' class and add 'will-animate' to prepare for scroll animations
    const animatedElements = document.querySelectorAll('.animated');
    animatedElements.forEach(element => {
      element.classList.remove('animated');
      element.classList.add('will-animate');
    });
    
    // Trigger first animations that are in viewport
    setTimeout(() => {
      this.animateOnScroll();
    }, 100);
  }

  // Animate elements when they come into view
  private animateOnScroll(): void {
    const elements = document.querySelectorAll('.will-animate');
    
    elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (elementPosition < windowHeight - 50) {
        element.classList.remove('will-animate');
        element.classList.add('animated');
      }
    });
  }

  // Initialize counter animation for statistics
  private initializeCounterAnimation(): void {
    const statElements = document.querySelectorAll('.stat-count');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateCounter(entry.target as HTMLElement);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    statElements.forEach(element => {
      observer.observe(element);
    });
  }

  // Animate counter for statistics
  private animateCounter(element: HTMLElement): void {
    const target = parseInt(element.getAttribute('data-count') || '0', 10);
    const duration = 2000; // 2 seconds
    const start = 0;
    const startTime = performance.now();
    
    const updateCounter = (currentTime: number) => {
      const elapsedTime = currentTime - startTime;
      if (elapsedTime > duration) {
        element.textContent = target.toString();
        return;
      }
      
      const progress = elapsedTime / duration;
      const currentCount = Math.floor(progress * (target - start) + start);
      element.textContent = currentCount.toString();
      
      requestAnimationFrame(updateCounter);
    };
    
    requestAnimationFrame(updateCounter);
  }

  // Handle mobile menu toggle
  toggleMobileMenu(): void {
    const navLinks = document.querySelector('.nav-links') as HTMLElement;
    navLinks.classList.toggle('active');
  }

  // Handle resource slider navigation
  nextResource(): void {
    const container = document.querySelector('.resources-container') as HTMLElement;
    container.scrollBy({ left: 380, behavior: 'smooth' });
  }

  prevResource(): void {
    const container = document.querySelector('.resources-container') as HTMLElement;
    container.scrollBy({ left: -380, behavior: 'smooth' });
  }

  // Handle testimonial slider navigation
  changeTestimonial(index: number): void {
    const container = document.querySelector('.testimonials-container') as HTMLElement;
    const testimonialWidth = container.clientWidth;
    
    container.scrollTo({ 
      left: index * testimonialWidth, 
      behavior: 'smooth' 
    });
    
    // Update active dot
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, i) => {
      if (i === index) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }

  // Handle contact form submission
  onSubmitContact(): void {
    // This will be implemented once backend integration is ready
    console.log('Contact form submitted');
    // Here you would normally handle form validation and API calls
    alert('Thank you for your message! We will get back to you soon.');
  }
}
