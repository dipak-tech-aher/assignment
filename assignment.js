function uncompress(s) {
    let stack = [];
    
    for (let char of s) {
        if (char !== ')') {
            stack.push(char);
        } else {
            let substr = '';
            while (stack[stack.length - 1] !== '(') {
                substr = stack.pop() + substr;
            }
            stack.pop(); // Remove the '('

            let k = '';
            while (stack.length && !isNaN(stack[stack.length - 1])) {
                k = stack.pop() + k;
            }
            k = parseInt(k);

            let expanded = substr.repeat(k);
            for (let expChar of expanded) {
                stack.push(expChar);
            }
        }
    }
    
    return stack.join('');
}

// Example usage:
console.log(uncompress('3(ab)')); // Output: 'ababab'
console.log(uncompress('3(ab2(c))')); // Output: 'abccabccabcc'
