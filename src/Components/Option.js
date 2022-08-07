
import 'antd/dist/antd.css';
import { Row, Col } from 'antd';
import "./Option.css"

const Option = (props)=>{
  const opt = props.optionstatement.opt;
  const indx = props.optionstatement.optindx;
console.log(props)
    return (
      <div className="Option_choices__3PO2a" >
          <div className="Option_label__Ix2mi">
              <strong>{indx+1}</strong>
          </div>
          <div className="Option_content__wGOuX">
           {opt}
          </div>
      </div>
    )
}
export default Option
