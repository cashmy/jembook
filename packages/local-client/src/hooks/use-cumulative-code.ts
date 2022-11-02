import { useTypedSelector } from "./use-typed-selector";

export const useCumulativeCode = (cellId: string) => {
    return useTypedSelector((state) => {
        const { data, order } = state.cells;
        const orderedCells = order.map((id) => data[id]);
    
        // Add "show" function to the top of the bundle
        // _React and _ReactDOM are used to avoid naming conflicts
        // Both variables (React and _React) point to the same package.
        //    ESBuild is been configured to use these particular names
        //    instead createReactElement and createReactDOM
        const showFunc = `
            import _React from 'react';
            import _ReactDOM from 'react-dom';
            var show = (value) => {
              const root = document.querySelector('#root');
              if (typeof value === 'object') {
                if (value.$$typeof && value.props) { 
                  _ReactDOM.render(value, root);
                } else {
                  root.innerHTML = JSON.stringify(value);
                }
              } else {
                root.innerHTML = value;
              }
            };
          `;
        const showFuncNoop = 'var show = () => {}';
    
        const cumulativeCode = [];
    
        for (let c of orderedCells) {
          if (c.type === 'code') {
            if (c.id === cellId) {
              cumulativeCode.push(showFunc);
            } else {
              cumulativeCode.push(showFuncNoop);
            }
            cumulativeCode.push(c.content);
          }
          if (c.id === cellId) {
            break;
          }
        }
        return cumulativeCode;
      }).join('\n');
}