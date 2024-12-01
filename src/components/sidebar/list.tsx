import Item from './item.tsx';

export default function List({list = []}){
  return <div className = 'flex flex-col gap-4'>
    {
      list && list.length > 0 && list.map((item, i) => {
        return <Item key = {i} item = {item}/>
      })
    }
  </div>
}