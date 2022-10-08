import { useEffect } from "react";
import { useRouter } from "next/router";

/**
 * "If the user is authenticated, redirect them to the authenticated page."
 *
 * @param {boolean} isAuthenticated - boolean
 */
export default function useAuthRedirect(isAuthenticated: boolean) {
  const router = useRouter();

  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);

    if (isAuthenticated) router.push("/authenticated");
  });
}
