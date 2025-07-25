import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const loggedInUser = localStorage.getItem("loggedInUsername"); // ✅ Use consistent key

  if (loggedInUser) {
    return true;
  } else {
    alert("You can access this page only when logged in!");
    router.navigate(['']); // Redirect to landing page
    return false;
  }
};
