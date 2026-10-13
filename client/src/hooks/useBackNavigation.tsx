// import { useEffect, useRef } from "react";

// const BACK_NAV_HASH = "#_";

// export function useBackNavigation(
//   active: boolean,
//   onBack: () => void
// ) {
//   const historyPushed = useRef(false);
//   const onBackRef = useRef(onBack);

//   // Always keep the latest callback
//   useEffect(() => {
//     onBackRef.current = onBack;
//   }, [onBack]);

//   // ALWAYS listen for browser Back/Forward
//   useEffect(() => {
//     const handlePopState = () => {

//       if (!historyPushed.current) {
//         return;
//       }

//       historyPushed.current = false;
//       onBackRef.current();
//     };

//     window.addEventListener("popstate", handlePopState);

//     return () => {
//       window.removeEventListener("popstate", handlePopState);
//     };
//   }, []);

//   // Handle opening/closing
//   useEffect(() => {
//     if (!active) {
//       if (window.location.hash === BACK_NAV_HASH) {
//         window.history.replaceState(
//           window.history.state,
//           "",
//           window.location.pathname
//         );
//       }

//       historyPushed.current = false;
//       return;
//     }

//     if (historyPushed.current) {
//       return;
//     }


//     window.history.pushState(
//       {
//         ...window.history.state,
//         backNavigation: true,
//       },
//       "",
//       window.location.pathname + BACK_NAV_HASH
//     );

//     historyPushed.current = true;

//   }, [active]);
// }