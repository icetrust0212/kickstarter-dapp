import { Form, Input,  Message , Button} from "semantic-ui-react";
import { useState } from 'react';
const ContributeForm = (props:any) => {
  const [value, setvalue] = useState(0);
  const handleSubmit = (event:any) => {
    event.preventDefault();
  }
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Field>
        <label htmlFor="">Amount of contribution</label>
        <Input 
          label='wei' 
          labelPosition="right"
          value={value}
          onChange={e => {
            setvalue(e.target.value);
          }}
        ></Input>
      </Form.Field>
      <Button primary>
        Contribute!!
      </Button>
    </Form>
  )
}

export default ContributeForm;