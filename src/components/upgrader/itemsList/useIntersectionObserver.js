// useIntersectionObserver.js
import { onCleanup, onMount } from 'solid-js';

export default function useIntersectionObserver(ref, options, callback) {
  let observer;
  onMount(() => {
    observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        // You can check entry.isIntersecting property
        if (entry.isIntersecting) {
          // Do something when the element comes into view
          entry.target.style.backgroundColor = 'green';
          callback(entry);
        } else {
          // Do something when the element goes out of view
          entry.target.style.backgroundColor = 'red';
        }
      });
    }, options);
    if (ref()) observer.observe(ref());
  });
  onCleanup(() => observer && observer.disconnect());
}