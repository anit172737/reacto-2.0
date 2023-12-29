const Menu = [
  {
    question: "What is Javascript ?",
    answer:
      "JavaScript (JS) is a lightweight interpreted (or just-in-time compiled) programming language used to create interactive web applications. While it is most well-known as the scripting language for Web pages, it is versatile programming language because it is used for both frontend and backend side.",
    speaking: false,
    loading: false,
  },
  {
    question: "Is javascript synchronous or asynchronous ?",
    answer:
      "JavaScript is a synchronous single-threaded( just one line of code may be run at once ) language but with help of event loop and promise javascript used to do asynchronous programming.",
    speaking: false,
    loading: false,
  },
  {
    question: "How many data types in javascript ?",
    answer:
      "There are 8 data types in javascript - 1. String, 2. Number, 3. Boolean, 4. Undefined, 5. Null, 6. Symbol, 7. BigInt, 8. Object",
    speaking: false,
    loading: false,
  },
  {
    question: "Define primitive and non-primitive data types' ?",
    answer:
      "'Primitive' data types are predefined data types provided by javascript. it is also known as in-built data types. 'Non-primitive' data types are derived from primitive data types. it is also knows as derived data types or reference data types.' ",
    speaking: false,
    loading: false,
  },
  {
    question: "Differece between 'undefined' and 'not defined' ?",
    answer:
      "Undefined means variable has been declared but not given a value, while Not defined means variable does'nt exist.",
    speaking: false,
    loading: false,
  },
  {
    question: "What is Event Loop ?",
    answer:
      "Event loop constantly checks whether call stack is empty or not. if it is empty then event loop added new functions from the event queue. if it is not then the current function call is processed.",
    speaking: false,
    loading: false,
  },
  {
    question: "What is Destructuring ?",
    answer:
      "Destructuring help us to unpack values from arrays and objects and assign them to separate variables in simple and smooth way.",
    speaking: false,
    loading: false,
  },
  {
    question: "What is Promise ?",
    answer:
      "Promise is a way to handle asynchronous oprations, it referes as a value which will resolve or reject. Promise has three phases Pending, Fullfilled and Failed.",
    speaking: false,
    loading: false,
  },
  {
    question: "What is Closures ?",
    answer:
      "A closure is the combination of a function bundled together (enclosed) with references to its surrounding state (the lexical environment). In other words, a closure gives you access to an outer function's scope from an inner function. In JavaScript, closures are created every time a function is created, at function creation time.",
    speaking: false,
    loading: false,
  },
  {
    question: "What is Hoisting ?",
    answer:
      "Hoisting refers to the process whereby variable or function declaration move to the top of their respective scope, means we can access or use variables or functions before declaration. ",
    speaking: false,
    loading: false,
  },
  {
    question: "What is Prototype ?",
    answer:
      "All javascript objects inherites properties and methods from a prototype. prototype is blue print of object properties and methods.",
    speaking: false,
    loading: false,
  },
  {
    question: "What is Currying ?",
    answer:
      "It is a javascript technique in that transforms the function of multiple agruments into several functions of single argument in sequence.",
    speaking: false,
    loading: false,
  },
  {
    question: "What is Babel ?",
    answer:
      "Babel is a javascript compiler, which is converts ECMAScript 2015+(ES6+) code into backward compatible version of javascript in current or older browser.",
    speaking: false,
    loading: false,
  },
  {
    question: "What is Webpack ?",
    answer:
      "Webpack is a module bundler, it is used to resolving web of dependancies and merging files into a optimize bundle for browser. the goal is to reducing the number of requests for files when user visits the web page.",
    speaking: false,
    loading: false,
  },
  {
    question: "What is code splitting ?",
    answer:
      "Code splitting is a process of splitting the application's bundle into smaller chunks. The goal is to improve initial load time of application by loading the code which is required to run that page.",
    speaking: false,
    loading: false,
  },
  {
    question: "What is Rendering ?",
    answer:
      "There is an unavoidable unit of work to convert the code you write in React into the HTML representation of your UI",
    speaking: false,
    loading: false,
  },
  {
    question: "What is CSR and SSR ?",
    answer:
      "CSR stands for Client Side Rendering and SSR stands for Server Side Rendering.",
    speaking: false,
    loading: false,
  },
  {
    question: "What is CORS ?",
    answer:
      "CORS stands for Cross Origin Resource Sharing. it is mechanism by data or any resource of a site could be shared intentionally with the third party website when there is a need.",
    speaking: false,
    loading: false,
  },
  {
    question: "What is Cookies ?",
    answer:
      "Cookies is a just a textual information about website. when we visit a particular website, some information is saved by our local system so that when we visit the same website again, this website able to recognize us and shows us the result according our preferences.",
    speaking: false,
    loading: false,
  },
  {
    question: "What is Tree Shaking ?",
    answer: "It is commonly used term in javascript for dead-code elimination",
    speaking: false,
    loading: false,
  },
  {
    question: "Difference between Rest and Spread Operator ?",
    answer:
      "The main difference between Rest and Spread Operator is that rest operator puts rest of some specific user supplied values into javascript array and spread operator expands iterables into individual elements.",
    speaking: false,
    loading: false,
  },
  {
    question: "Difference between export default and export ?",
    answer:
      "export default is used to export a single value as the default export, while export with named exports is used to export multiple values as named exports.",
    speaking: false,
    loading: false,
  },
];

export default Menu;
