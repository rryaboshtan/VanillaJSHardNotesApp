export default function defineIdProperty(note) {
   Object.defineProperty(note, 'id', {
      enumerable: false,
      configurable: false,
      writable: true,
      value: Math.random() * 200,
   });
}