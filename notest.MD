# Notes

  

using `ref` attribute:
```jsx
<input type="text" ref={(input) => this.userNameInput = input} required/>
```
and then we can acces it:  
```
this.userNameInput.value
```