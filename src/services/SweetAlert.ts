import Swal from "sweetalert2";

class SweetAlert {
    info(content: string) {
        return Swal.fire({
            text: content
        });
    }

    infoHtml(html: string) {
        return Swal.fire({
            html: html
        });
    }

    success(title: string, message: string, confirmBtnText: string, cancellable: boolean) {
        return Swal.fire({
            title: title,
            type: 'success',
            text: message,
            showCancelButton: cancellable ? cancellable : false,
            confirmButtonText: confirmBtnText ? confirmBtnText : 'OK'
        });
    }

    error(title: string, message: string, confirmBtnText: string, cancellable: boolean) {
        return Swal.fire({
            title: title,
            text: message,
            type: 'error',
            showCancelButton: cancellable ? cancellable : false,
            confirmButtonText: confirmBtnText ? confirmBtnText : 'OK'
        });
    }

    confirmDelete(title: string, message: string, preConfirm: any, ok: string, cancel: string) {
        /* callback is handle function when click confirm or cancel action */
        return Swal.fire({
            title: title ? title : 'Are you sure?',
            text: message ? message : "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            // cancelButtonColor: '#d33',
            confirmButtonText: ok ? ok : 'Confirm',
            cancelButtonText: cancel ? cancel : 'Cancel!',
            allowOutsideClick: false,
            showLoaderOnConfirm: true,
            preConfirm: preConfirm
        });
    }

    confirm(message: string, preConfirm: any) {
        return Swal.fire({
            title: "",
            text: message ? message : "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            // cancelButtonColor: '#d33',
            confirmButtonText: "Confirm",
            cancelButtonText: "Cancel",
            allowOutsideClick: false,
            showLoaderOnConfirm: true,
            preConfirm: preConfirm
        });
    }

    alertError(title: string, message: string, preConfirm: any) {
        return Swal.fire({
            title: title,
            text: message ? message : "Errors!",
            type: 'warning',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            confirmButtonText: "Confirm",
            allowOutsideClick: false,
            showLoaderOnConfirm: true,
            preConfirm: preConfirm
        });
    }

    confirmApproval(title: string, message: string, preConfirm: any, ok: string) {
        return Swal.fire({
            title: title ? title : 'Are you sure?',
            text: message ? message : "You won't be able to revert this!",
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            confirmButtonText: ok,
            cancelButtonText: "Cancel",
            reverseButtons: true,
            allowOutsideClick: false,
            showLoaderOnConfirm: true,
            preConfirm: preConfirm
        });
    }
}

export default new SweetAlert;
