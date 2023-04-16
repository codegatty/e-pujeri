import { useContext,useState } from "react";

import AnnouncementForm from "./AnnouncementForm";
import { addAnnouncement, updateAnnouncement } from '../../util/http/announcementHttp';
import { AnnouncementContext } from '../../store/announcements-context';
import LoadingOverlay from "../ui/LoadingOverlay";
import ErrorOverlay from "../ui/ErrorOverlay";

function ManageAnnouncement({ navigation, route }) {

    const annCtx = useContext(AnnouncementContext);
    const [isError,setError]=useState(false)
    const [isLoading,setLoading]=useState(false)

    const selectedAnnId = route.params?.annId;
    const isEditing = !!selectedAnnId;
    const selectedAnn = annCtx.announcement.find((ann) => ann.id === selectedAnnId)

    async function onSubmitHandler(annData) {
        setLoading(true)
        try{
        if (isEditing) {
            await updateAnnouncement(selectedAnnId, annData);
            annCtx.updateAnnouncement(selectedAnnId, annData);
            navigation.navigate("Announcements");
        } else {
            const annId = await addAnnouncement(annData);
            annCtx.addAnnouncement({ ...annData, id: annId });
            navigation.navigate("Announcements");
        }
    }catch(e){
        setLoading(false)
        setError(true)
    }
    }

    if(isLoading){
        return <LoadingOverlay />
    }
    if(isError){
       return <ErrorOverlay /> 
    }

    function onCancelHandler() {
        navigation.goBack();
    }
    return (
        <AnnouncementForm
            onSubmit={onSubmitHandler}
            onCancel={onCancelHandler}
            submitButtonTitle={isEditing ? 'Update' : 'Add'}
            defaultValue={isEditing && selectedAnn} />
    );

}

export default ManageAnnouncement;