import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';

import lgZoom from 'lightgallery/plugins/zoom';
import LightGallery from 'lightgallery/react';
import {useState, useRef, useCallback, useEffect} from 'react';

export default function Gallery() {
	const lightGallery = useRef(null);
	const [items, setItems] = useState([
		{
			id: '1',
			size: '500-300',
			src: '/Images/20170711_124824.jpeg',
			thumb: '/Images/20170711_124824.jpeg',
		},
		{
			id: '2',
			size: '500-300',
			src: '/Images/20180308_180114.jpeg',
			thumb: '/Images/20180308_180114.jpeg',
		},
	]);

	const addItem = useCallback(() => {
		setItems([
			...items,
			{
				id: '5',
				size: '500-300',
				src: '/Images/IMG_4018.jpeg',
				thumb: '/Images/IMG_4018.jpeg',
			},
			{
				id: '6',
				size: '200-200',
				src: '/Images/IMG_3282.jpeg',
				thumb: '/Images/IMG_3282.jpeg',
			},
		]);
	}, []);

	const onInit = useCallback(detail => {
		if (detail) {
			lightGallery.current = detail.instance;
		}
	}, []);

	const getItems = useCallback(() => {
		return items.map(item => {
			return (
				<div key={item.id} data-lg-size={item.size} data-src={item.src}>
					<img src={item.thumb} />
				</div>
			);
		});
	}, [items]);

	useEffect(() => {
		lightGallery.current.refresh();
	}, [items]);

	return (
		<div className="App">
			<button onClick={addItem}>Add new item</button>
			<LightGallery plugins={[lgZoom]} elementClassNames="custom-class-name" onInit={onInit}>
				{getItems()}
			</LightGallery>
		</div>
	);
}
