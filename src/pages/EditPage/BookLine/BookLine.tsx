import { addFragment, changebookname, removebook, setBookImage, ShowHideBook } from '../../../redux/slices/EditSlice';
import { useAppDispatch } from '../../../redux/store';
import { bookpart } from '../../../types/pleerSlice';
import { getSrcFromFile } from '../../../Utils/other/getSrc';
import { BookPart } from '../BookPart/BookPart';
import './style.scss';

type props = {
    numcoll: number,
    numbook:number,
    name:string,
    image:string,
    bookparts: bookpart[],
    showB:boolean,
}

export function Bookline({numcoll,numbook,name,bookparts,image,showB}:props){
    let dispatch = useAppDispatch();
        
    let imagePrevieStyle = {
        backgroundImage:`url(${image})`,
    }
    let arrayFragmentsStyle={
        height:`${(bookparts.length+1)*45}px`,
    }
    async function ImageInputOnChange(event: React.ChangeEvent<HTMLInputElement>){
        let file = event.target.files![0];
        let src =await getSrcFromFile(file);
        let payload = {
            imgSrc:src,
            numColl:numcoll, 
            nummBook:numbook,
        }
        dispatch(setBookImage(payload));
        event.target.value='';
    }
    function showhide(){
        dispatch(ShowHideBook({
            numColl:numcoll,
            nummBook:numbook,
        }))
    }
    function addFragmentInput(event: React.ChangeEvent<HTMLInputElement>){
        let files = event.target.files;
        if (!files) return;
        for(let i=0; i<files.length;i++){

            dispatch(addFragment({numColl:numcoll,nummBook:numbook}))
            console.log(files[i]);
        }
        event.target.value='';
    }

    let bookPartsBlocks = bookparts.map((elem,index)=>{
        return <BookPart
        part={elem}
        key={index}
        />
    });

    return <div className={`edit-book-line ${showB?'show':''}`}>
        <div className='book-block'>
            <input type="text" value={name} onChange={(event)=>dispatch(changebookname({Collnum: numcoll, Booknum:numbook, newName:event.target.value}))}/>
            <div className='symb' onClick={showhide}></div>
            <div className='delete' onClick={()=>dispatch(removebook({Collnum: numcoll, Booknum:numbook}))}>
                <div className='try'></div>
                <div className='try'></div>
            </div>
            <div className={`add-imageforbook ${image?'haveimage':''}`}>
                <div className='image-previe' style={imagePrevieStyle}></div>
                <span>загрузить картинку</span>
                <input type="file" onChange={ImageInputOnChange}/>
            </div>
        </div>
        <div className='array-fragments' style={arrayFragmentsStyle}>
            {bookPartsBlocks}
            <div className='add-fragments-button'>
                <span>Загрузить фрагменты</span>
                <input type="file" onChange={addFragmentInput} multiple />
            </div>
        </div>
    </div>
}