import { useContext } from "react";

import AnnouncementForm from "./AnnouncementForm";
import { addAnnouncement, updateAnnouncement } from '../../util/http/announcementHttp';
import { AnnouncementContext } from '../../store/announcements-context';

function ManageAnnouncement({ navigation, route }) {

    const annCtx = useContext(AnnouncementContext);

    const selectedAnnId = route.params?.annId;
    const isEditing = !!selectedAnnId;
    const selectedAnn = annCtx.announcement.find((ann) => ann.id === selectedAnnId)

    async function onSubmitHandler(annData) {
        if (isEditing) {
            await updateAnnouncement(selectedAnnId, annData);
            annCtx.updateAnnouncement(selectedAnnId, annData);
            navigation.navigate("Announcements");
        } else {
            const annId = await addAnnouncement(annData);
            annCtx.addAnnouncement({ ...annData, id: annId });
            navigation.navigate("Announcements");
        }
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