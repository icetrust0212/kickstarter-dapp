import Header from './Header';
import {Container} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css'
interface Props {
  children: any[] | any,
}
const Layout = (props:Props) => {
  return (
    <Container>
      <Header />
       {props.children}
      <h1>I am a footer</h1>
    </Container>
  );
}

export default Layout;