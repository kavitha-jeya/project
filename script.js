/**
 * DS CONSTRUCTION — Interactive Script
 * Managing Director: Dillybabu | Chennai
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // ------------------------------------------------------------------------
  // 1. Navigation & Scroll Awareness
  // ------------------------------------------------------------------------
  const navbar = document.querySelector('.navbar');
  const backToTopBtn = document.getElementById('backToTop');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  const handleScroll = () => {
    const scrollY = window.scrollY;

    // Sticky navbar backdrop
    if (navbar) {
      if (scrollY > 30) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    // Back to top visibility
    if (backToTopBtn) {
      if (scrollY > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }

    // ScrollSpy active link update
    let currentSectionId = '';
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ------------------------------------------------------------------------
  // 2. Mobile Drawer Navigation
  // ------------------------------------------------------------------------
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerBackdrop = document.getElementById('drawerBackdrop');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  const openMobileMenu = () => {
    mobileToggle?.classList.add('active');
    mobileDrawer?.classList.add('open');
    drawerBackdrop?.classList.add('active');
    document.body.style.overflow = 'hidden';
    mobileToggle?.setAttribute('aria-expanded', 'true');
  };

  const closeMobileMenu = () => {
    mobileToggle?.classList.remove('active');
    mobileDrawer?.classList.remove('open');
    drawerBackdrop?.classList.remove('active');
    document.body.style.overflow = '';
    mobileToggle?.setAttribute('aria-expanded', 'false');
  };

  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileDrawer?.classList.contains('open');
      if (isOpen) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });
  }

  if (drawerBackdrop) {
    drawerBackdrop.addEventListener('click', closeMobileMenu);
  }

  mobileNavLinks.forEach((link) => {
    link.addEventListener('click', closeMobileMenu);
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (mobileDrawer?.classList.contains('open')) {
        closeMobileMenu();
      }
      closeProjectModal();
    }
  });

  // ------------------------------------------------------------------------
  // 3. Project Filter Tabs
  // ------------------------------------------------------------------------
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach((card) => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.classList.remove('hide');
        } else {
          card.classList.add('hide');
        }
      });
    });
  });

  // ------------------------------------------------------------------------
  // 4. Project Details Modal
  // ------------------------------------------------------------------------
  const projectModal = document.getElementById('projectModal');
  const modalClose = document.getElementById('modalClose');
  const modalImage = document.getElementById('modalImage');
  const modalBadge = document.getElementById('modalBadge');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const modalScope = document.getElementById('modalScope');
  const modalStructure = document.getElementById('modalStructure');
  const modalFinishes = document.getElementById('modalFinishes');
  const modalLocation = document.getElementById('modalLocation');
  const modalConsultBtn = document.getElementById('modalConsultBtn');

  // Detailed Project Showcase Data
  const projectDatabase = {
    'proj-villa': {
      title: 'Modern Residential Villa',
      category: 'Residential',
      image: 'assets/images/proj_villa.jpg',
      badge: 'Residential Villa Showcase',
      desc: 'An exquisite contemporary G+2 residential villa designed for luxury living. Features generous cantilevered terraces, expansive floor-to-ceiling high-efficiency glazing, custom teak wood cladding elements, and integrated landscaping with water features.',
      scope: '4,650 Sq.Ft Built-up Area',
      structure: 'Framed RCC with M30 Grade Concrete',
      finishes: 'Italian Marble & Teak Joinery',
      location: 'Chennai Region'
    },
    'proj-home': {
      title: 'Contemporary Family Home',
      category: 'Residential',
      image: 'assets/images/proj_familyhome.jpg',
      badge: 'Individual Residence Showcase',
      desc: 'A sophisticated dual-level family home harmonizing rustic natural dry-stone masonry with clean geometric minimalist white architecture. Designed for natural cross-ventilation, expansive private balconies, and landscaped courtyard parking.',
      scope: '3,200 Sq.Ft Individual House',
      structure: 'Reinforced Column & Beam Frame',
      finishes: 'Natural Stone Cladding & Glass Railings',
      location: 'Chennai Suburbs'
    },
    'proj-commercial': {
      title: 'Commercial Corporate Building',
      category: 'Commercial',
      image: 'assets/images/proj_commercial.jpg',
      badge: 'Commercial Showcase',
      desc: 'Modern multi-storey commercial complex featuring high-performance insulated curtain wall glazing, architectural bronze louvers, energy-efficient spatial planning, and an expansive ground-floor welcoming atrium.',
      scope: '18,500 Sq.Ft Multi-Storey',
      structure: 'Commercial Heavy RCC Post-Tensioned',
      finishes: 'Acoustic Ceilings & Composite Panels',
      location: 'Commercial Corridor, Chennai'
    },
    'proj-structural': {
      title: 'Heavy Structural Civil Engineering',
      category: 'Structural',
      image: 'assets/images/proj_structural.jpg',
      badge: 'Civil Engineering Showcase',
      desc: 'Precision civil engineering foundation and structural superstructure execution. Featuring deep isolated and combined footings, Fe550D TMT reinforcement cages, heavy-load grade beams, and high-tolerance concrete curing procedures.',
      scope: 'Substructure & Framing Matrix',
      structure: 'Fe550D High Tensile TMT + M35 Mix',
      finishes: 'Industrial Formwork Smooth Finish',
      location: 'Chennai Industrial Sector'
    },
    'proj-interior': {
      title: 'Luxury Interior Living Finishing',
      category: 'Renovation',
      image: 'assets/images/proj_interior.jpg',
      badge: 'Interior Finishing Showcase',
      desc: 'Complete turnkey interior architectural finishing for luxury living spaces. Encompasses bespoke geometric acoustic wood ceiling features, recessed warm indirect LED cove lighting, bookmatched Italian marble flooring, and premium concealed electrical fittings.',
      scope: '2,800 Sq.Ft Interior Fit-out',
      structure: 'Concealed Services & Acoustic Drywall',
      finishes: 'Imported Marble & Teak Veneer',
      location: 'Chennai Prime Zone'
    },
    'proj-exterior': {
      title: 'Modern Exterior Elevation & Renovation',
      category: 'Renovation',
      image: 'assets/images/proj_exterior.jpg',
      badge: 'Exterior Architecture Showcase',
      desc: 'Architectural facade modernization and elevation remodeling. Incorporates vertical composite timber louvers, textured slate cladding, ambient facade strip lighting, and modern cantilevered canopy design.',
      scope: 'Full Exterior Remodeling',
      structure: 'Retrofit Steel Framing & Anchors',
      finishes: 'Slate Stone, WPC Fins & Linear LED',
      location: 'Chennai Residential Area'
    }
  };

  const openProjectModal = (projectId) => {
    const data = projectDatabase[projectId];
    if (!data || !projectModal) return;

    if (modalImage) {
      modalImage.src = data.image;
      modalImage.alt = data.title;
    }
    if (modalBadge) modalBadge.textContent = data.badge;
    if (modalTitle) modalTitle.textContent = data.title;
    if (modalDesc) modalDesc.textContent = data.desc;
    if (modalScope) modalScope.textContent = data.scope;
    if (modalStructure) modalStructure.textContent = data.structure;
    if (modalFinishes) modalFinishes.textContent = data.finishes;
    if (modalLocation) modalLocation.textContent = data.location;

    if (modalConsultBtn) {
      modalConsultBtn.onclick = () => {
        closeProjectModal();
        const contactSection = document.getElementById('contact');
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth' });
          const projectSelect = document.getElementById('projectType');
          if (projectSelect) {
            projectSelect.value = data.category === 'Commercial' ? 'Commercial Building' : 'Residential Villa';
          }
        }
      };
    }

    projectModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    modalClose?.focus();
  };

  const closeProjectModal = () => {
    if (!projectModal) return;
    projectModal.classList.remove('active');
    document.body.style.overflow = '';
  };

  // Attach modal trigger listeners
  document.querySelectorAll('.open-modal-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = btn.getAttribute('data-project');
      if (projectId) {
        openProjectModal(projectId);
      }
    });
  });

  if (modalClose) {
    modalClose.addEventListener('click', closeProjectModal);
  }

  if (projectModal) {
    projectModal.addEventListener('click', (e) => {
      if (e.target === projectModal) {
        closeProjectModal();
      }
    });
  }

  // ------------------------------------------------------------------------
  // 5. Service "Discuss Your Project" Quick Links
  // ------------------------------------------------------------------------
  document.querySelectorAll('.service-discuss-link').forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const serviceName = link.getAttribute('data-service');
      const contactSection = document.getElementById('contact');
      const projectSelect = document.getElementById('projectType');

      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }

      if (projectSelect && serviceName) {
        // Find matching option
        for (let i = 0; i < projectSelect.options.length; i++) {
          if (projectSelect.options[i].text.toLowerCase().includes(serviceName.toLowerCase()) ||
              projectSelect.options[i].value.toLowerCase().includes(serviceName.toLowerCase())) {
            projectSelect.selectedIndex = i;
            break;
          }
        }
        projectSelect.focus();
      }
    });
  });

  // ------------------------------------------------------------------------
  // 6. Contact & Quote Request Form Handling
  // ------------------------------------------------------------------------
  const quoteForm = document.getElementById('quoteForm');
  const feedbackCard = document.getElementById('formFeedback');
  const sendWhatsAppBtn = document.getElementById('feedbackWhatsAppBtn');
  const sendEmailBtn = document.getElementById('feedbackEmailBtn');

  if (quoteForm) {
    const inputs = quoteForm.querySelectorAll('input, select, textarea');

    // Remove error class on input
    inputs.forEach((input) => {
      input.addEventListener('input', () => {
        const group = input.closest('.form-group');
        if (group) {
          group.classList.remove('has-error');
          input.classList.remove('is-invalid');
        }
      });
    });

    quoteForm.addEventListener('submit', (e) => {
      e.preventDefault();

      let isValid = true;
      const name = document.getElementById('userName')?.value.trim();
      const phone = document.getElementById('userPhone')?.value.trim();
      const email = document.getElementById('userEmail')?.value.trim();
      const projectType = document.getElementById('projectType')?.value;
      const location = document.getElementById('projectLocation')?.value.trim();
      const budget = document.getElementById('projectBudget')?.value || 'Not Specified';
      const message = document.getElementById('userMessage')?.value.trim();

      // Validate Name
      const nameGroup = document.getElementById('userName')?.closest('.form-group');
      if (!name || name.length < 2) {
        nameGroup?.classList.add('has-error');
        document.getElementById('userName')?.classList.add('is-invalid');
        isValid = false;
      }

      // Validate Phone (At least 10 digits)
      const phoneGroup = document.getElementById('userPhone')?.closest('.form-group');
      const phoneClean = phone?.replace(/\D/g, '') || '';
      if (!phone || phoneClean.length < 10) {
        phoneGroup?.classList.add('has-error');
        document.getElementById('userPhone')?.classList.add('is-invalid');
        isValid = false;
      }

      // Validate Email
      const emailGroup = document.getElementById('userEmail')?.closest('.form-group');
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email || !emailRegex.test(email)) {
        emailGroup?.classList.add('has-error');
        document.getElementById('userEmail')?.classList.add('is-invalid');
        isValid = false;
      }

      // Validate Project Type
      const typeGroup = document.getElementById('projectType')?.closest('.form-group');
      if (!projectType) {
        typeGroup?.classList.add('has-error');
        document.getElementById('projectType')?.classList.add('is-invalid');
        isValid = false;
      }

      // Validate Location
      const locGroup = document.getElementById('projectLocation')?.closest('.form-group');
      if (!location) {
        locGroup?.classList.add('has-error');
        document.getElementById('projectLocation')?.classList.add('is-invalid');
        isValid = false;
      }

      // Validate Message
      const msgGroup = document.getElementById('userMessage')?.closest('.form-group');
      if (!message || message.length < 10) {
        msgGroup?.classList.add('has-error');
        document.getElementById('userMessage')?.classList.add('is-invalid');
        isValid = false;
      }

      if (!isValid) {
        const firstError = quoteForm.querySelector('.has-error');
        if (firstError) {
          firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return;
      }

      // ----------------------------------------------------------------------
      // Format Inquiry Payload
      // Note: In client-side only environments, this formats the enquiry
      // and triggers direct WhatsApp / mailto links to Dillybabu (7200559079).
      // Backend integration note: To send via server API, replace with:
      // fetch('/api/quote', { method: 'POST', body: JSON.stringify({...}) })
      // ----------------------------------------------------------------------
      const whatsappText = `Hello Dillybabu (DS Construction),%0A%0AI would like to discuss a construction project:%0A- Name: ${encodeURIComponent(name)}%0A- Phone: ${encodeURIComponent(phone)}%0A- Email: ${encodeURIComponent(email)}%0A- Project Type: ${encodeURIComponent(projectType)}%0A- Location: ${encodeURIComponent(location)}%0A- Approx Budget: ${encodeURIComponent(budget)}%0A- Requirements: ${encodeURIComponent(message)}%0A%0APlease contact me.`;
      const whatsappUrl = `https://wa.me/917200559079?text=${whatsappText}`;

      const emailSubject = encodeURIComponent(`New Project Enquiry: ${projectType} - ${name}`);
      const emailBody = encodeURIComponent(`Dear Dillybabu,\n\nI would like to request a consultation and estimate for my project:\n\nClient Name: ${name}\nPhone: ${phone}\nEmail: ${email}\nProject Type: ${projectType}\nProject Location: ${location}\nApproximate Budget: ${budget}\n\nProject Requirements / Message:\n${message}\n\nBest regards,\n${name}`);
      const mailtoUrl = `mailto:Dillybabu1993@gmail.com?subject=${emailSubject}&body=${emailBody}`;

      // Update feedback buttons
      if (sendWhatsAppBtn) {
        sendWhatsAppBtn.href = whatsappUrl;
      }
      if (sendEmailBtn) {
        sendEmailBtn.href = mailtoUrl;
      }

      // Show Feedback Card
      if (feedbackCard) {
        feedbackCard.classList.add('active');
        feedbackCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }

      // Automatically open WhatsApp in new tab for direct client convenience
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    });
  }

  // ------------------------------------------------------------------------
  // 7. Reveal On Scroll Animations (IntersectionObserver)
  // ------------------------------------------------------------------------
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    revealElements.forEach((el) => revealObserver.observe(el));
  } else {
    // Fallback for older browsers
    revealElements.forEach((el) => el.classList.add('revealed'));
  }
});
