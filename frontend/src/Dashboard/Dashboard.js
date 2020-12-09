import React, {useState} from 'react';
import ImagePicker from './ImagePicker/ImagePicker';

const Dashboard = () => {
    const [image, setImage] = useState(null);

    return (
        <div>
            I'm the dashboard
            <ImagePicker
                submitImage={setImage}
                removeImage={setImage}
                currentImage={image}
            />
        </div>
    );
};

export default Dashboard;