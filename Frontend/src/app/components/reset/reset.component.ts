import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-reset',
  standalone: true,
  imports: [RouterLink,FormsModule],
  templateUrl: './reset.component.html',
  styleUrl: './reset.component.css'
})
export class ResetComponent implements OnInit{
  currentStep: number = 1;
  email: string = '';
  verificationCode: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  passwordStrength: number = 0;
  passwordsMatch: boolean = false;
  passwordRequirements = {
    length: false,
    uppercase: false,
    lowercase: false,
    number: false
  };
  timerInterval: any;
  resendTimerInterval: any;
  timeLeft: number = 300; // 5 minutes in seconds
  resendTimeLeft: number = 30; // 30 seconds

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.setupCodeInputs();
  }

  ngOnDestroy(): void {
    this.clearTimers();
  }

  // Navigation between steps
  goToStep(step: number): void {
    // Update currentStep first
    this.currentStep = step;
    
    // Hide all steps
    const steps = ['emailStep', 'verifyStep', 'newPasswordStep', 'successStep'];
    steps.forEach(stepId => {
      const element = document.getElementById(stepId);
      if (element) {
        element.style.display = 'none';
      }
    });

    // Show the current step
    const currentStepElement = document.getElementById(steps[step - 1]);
    if (currentStepElement) {
      currentStepElement.style.display = 'block';
    }

    // Update progress bar
    const progressFill = document.getElementById('progressFill');
    if (progressFill) {
      progressFill.style.width = `${step * 25}%`;
    }

    // Update step labels
    for (let i = 1; i <= 4; i++) {
      const label = document.getElementById(`stepLabel${i}`);
      if (label) {
        if (i < step) {
          label.classList.remove('active');
          label.classList.add('completed');
        } else if (i === step) {
          label.classList.add('active');
          label.classList.remove('completed');
        } else {
          label.classList.remove('active', 'completed');
        }
      }
    }

    // Start timer if on verification step
    if (step === 2) {
      this.startVerificationTimer();
      this.startResendTimer();
    } else {
      this.clearTimers();
    }
  }

  // Step 1: Send verification code
  sendVerificationCode(): void {
    const emailInput = document.getElementById('recoveryEmail') as HTMLInputElement;
    if (emailInput && emailInput.checkValidity()) {
      this.email = emailInput.value;
      
      // Display the email in the verify step
      const emailDisplay = document.getElementById('emailDisplay');
      if (emailDisplay) {
        emailDisplay.textContent = this.email;
      }

      // TODO: API call to send verification code
      console.log('Sending verification code to:', this.email);
      
      // Navigate to verify step
      this.goToStep(2);
    } else {
      // Handle validation error
      emailInput.classList.add('error');
    }
  }

  // Step 2: Setup verification code inputs
  setupCodeInputs(): void {
    const codeInputs = document.querySelectorAll('.code-digit');
    
    codeInputs.forEach((input, index) => {
      const inputElement = input as HTMLInputElement;
      
      // Auto-focus next input when a digit is entered
      inputElement.addEventListener('input', () => {
        if (inputElement.value.length === 1) {
          if (index < codeInputs.length - 1) {
            (codeInputs[index + 1] as HTMLInputElement).focus();
          }
          this.updateVerificationCode();
        }
      });

      // Handle backspace
      inputElement.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace' && !inputElement.value && index > 0) {
          (codeInputs[index - 1] as HTMLInputElement).focus();
        }
      });
    });
  }

  // Update verification code string from inputs
  updateVerificationCode(): void {
    const codeInputs = document.querySelectorAll('.code-digit');
    let code = '';
    
    codeInputs.forEach(input => {
      code += (input as HTMLInputElement).value;
    });
    
    this.verificationCode = code;
  }

  // Verify code
  verifyCode(): void {
    if (this.verificationCode.length === 6) {
      // TODO: API call to verify code
      console.log('Verifying code:', this.verificationCode);
      
      // Navigate to password reset step
      this.goToStep(3);
    } else {
      // Handle validation error
      const codeInputs = document.querySelectorAll('.code-digit');
      codeInputs.forEach(input => {
        (input as HTMLInputElement).classList.add('error');
      });
    }
  }

  // Resend verification code
  resendCode(): void {
    // TODO: API call to resend code
    console.log('Resending verification code to:', this.email);
    
    // Reset timers
    this.timeLeft = 300; // 5 minutes
    this.resendTimeLeft = 30; // 30 seconds
    this.startResendTimer();
    
    // Clear inputs
    const codeInputs = document.querySelectorAll('.code-digit');
    codeInputs.forEach(input => {
      (input as HTMLInputElement).value = '';
    });
    
    // Focus first input
    (codeInputs[0] as HTMLInputElement).focus();
  }

  // Step 3: Password validation
  checkPasswordStrength(password: string): void {
    // Reset requirements
    this.passwordRequirements = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password)
    };

    // Update requirement indicators in the UI
    Object.keys(this.passwordRequirements).forEach(req => {
      const element = document.getElementById(`req-${req}`);
      if (element) {
        if (this.passwordRequirements[req as keyof typeof this.passwordRequirements]) {
          element.classList.add('valid');
        } else {
          element.classList.remove('valid');
        }
      }
    });

    // Calculate strength (0-4)
    const requirements = Object.values(this.passwordRequirements);
    const strengthValue = requirements.filter(Boolean).length;
    this.passwordStrength = strengthValue;

    // Update strength bars
    const strengthSegments = document.querySelectorAll('.strength-segment');
    strengthSegments.forEach((segment, index) => {
      if (index < strengthValue) {
        segment.classList.add('active');
      } else {
        segment.classList.remove('active');
      }
    });
    
    this.updateResetButtonState();
  }

  // Check if passwords match
  checkPasswordsMatch(): void {
    const passwordMatch = document.getElementById('passwordMatch');
    this.passwordsMatch = this.newPassword === this.confirmPassword && this.newPassword !== '';
    
    if (passwordMatch) {
      if (this.passwordsMatch) {
        passwordMatch.classList.add('valid');
        passwordMatch.querySelector('span')!.textContent = 'Passwords match';
      } else {
        passwordMatch.classList.remove('valid');
        passwordMatch.querySelector('span')!.textContent = 'Passwords do not match';
      }
    }

    this.updateResetButtonState();
  }

  // Toggle password visibility
  togglePasswordVisibility(targetId: string): void {
    const input = document.getElementById(targetId) as HTMLInputElement;
    const button = document.querySelector(`[data-target="${targetId}"]`);
    
    if (input && button) {
      if (input.type === 'password') {
        input.type = 'text';
        button.classList.add('show');
      } else {
        input.type = 'password';
        button.classList.remove('show');
      }
    }
  }

  // Update password reset button state
  updateResetButtonState(): void {
    const resetButton = document.getElementById('resetPasswordBtn') as HTMLButtonElement;
    
    if (resetButton) {
      // Enable button if all requirements are met and passwords match
      const allRequirementsMet = Object.values(this.passwordRequirements).every(Boolean);
      resetButton.disabled = !(allRequirementsMet && this.passwordsMatch);
    }
  }

  // Step 3: Reset password
  resetPassword(): void {
    if (this.passwordsMatch && this.passwordStrength >= 3) {
      // TODO: API call to reset password
      console.log('Resetting password');
      
      // Navigate to success step
      this.goToStep(4);
    }
  }

  // Go to login page
  goToLogin(): void {
    this.router.navigate(['/login']);
  }

  // Timer functions
  startVerificationTimer(): void {
    this.clearTimers();
    
    this.timerInterval = setInterval(() => {
      this.timeLeft--;
      this.updateTimerDisplay();
      
      if (this.timeLeft <= 0) {
        this.clearTimers();
        // Handle expired code
      }
    }, 1000);
    
    this.updateTimerDisplay();
  }

  startResendTimer(): void {
    const resendButton = document.getElementById('resendCodeBtn') as HTMLButtonElement;
    if (resendButton) {
      resendButton.disabled = true;
    }
    
    this.resendTimerInterval = setInterval(() => {
      this.resendTimeLeft--;
      const resendTimer = document.getElementById('resendTimer');
      if (resendTimer) {
        resendTimer.textContent = this.resendTimeLeft.toString();
      }
      
      if (this.resendTimeLeft <= 0) {
        clearInterval(this.resendTimerInterval);
        if (resendButton) {
          resendButton.disabled = false;
        }
      }
    }, 1000);
  }

  updateTimerDisplay(): void {
    const minutes = Math.floor(this.timeLeft / 60);
    const seconds = this.timeLeft % 60;
    const timerDisplay = document.getElementById('timerDisplay');
    
    if (timerDisplay) {
      timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
  }

  clearTimers(): void {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
    if (this.resendTimerInterval) {
      clearInterval(this.resendTimerInterval);
    }
  }
}
