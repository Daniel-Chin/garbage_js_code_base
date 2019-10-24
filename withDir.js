/*
A context manager the let you temporarily enter a directory.  
Not super useful if your project involves parallel execution, since process.cwd is not isolated per worker.  

Example:  
```js
withDir('public/', () => {
  fs.writeFileSync('a.txt', 'ha');
});
```
*/
const withDir = (path, toRun) => {
  const goBack = process.chdir.bind(null, process.cwd);
  process.chdir(path);
  try {
    toRun();
  } catch (e) {
    goBack();
    throw e;
  }
  goBack();
};

module.export = withDir;
