// import React, {Component} from 'react';
// import Counter from './counter';
// class Counters extends Component {

//     render() {
//         const {onReset,counters,onDelete,onIncrement}=this.props;
//         return (
//             <div>
//                 <button onClick={onReset} className="btn btn-primary btn-sm m-2">Reset</button>
//                 {this
//                     .props
//                     .counters
//                     .map(counuter => <Counter
//                         counter={counuter}
//                         key={counuter.id}
//                         value={counuter.value}
//                         id={counuter.id}
//                         onDecrement={this.props.onDecrement}
//                         onDelete={onDelete}
//                         onIncrement={onIncrement}/>)}

//             </div>
//         );
//     }
// }

// export default Counters;