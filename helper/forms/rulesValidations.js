import i18n from "../i18n/config"

export function rulesValidation(fields, values) {

	var errors = {}

	fields.map((field, i) => {

		if (field.required && !values[field.nameField]) {

			if (field.required && field.nameField == 'flagTerms') {

				errors[field.nameField] = i18n.t('validation:validation_4')

			} else {
				errors[field.nameField] = i18n.t('validation:validation_1')
			}

		} else if (values[field.nameField].length > field.maxLegth) {

			errors[field.nameField] = `form_length_max_${field.maxLegth}`

		} else if (values[field.nameField].length < field.minLegth) {

			errors[field.nameField] = `form_length_min_${field.minLegth}`

		} else if (field.formatMail && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values[field.nameField])) {

			if ((field.formatMail && /\s/g.test(values[field.nameField]))) {

				errors[field.nameField] = i18n.t('validation:validation_3')

			} else {
				errors[field.nameField] = i18n.t('validation:validation_2')
			}

		} else if (typeof (field.compareField) !== 'undefined') {

			if (values[field.compareField] !== values[field.nameField]) {
				errors[field.nameField] = `form_repeat_${field.compareField}`
			}

		}

		return errors

	})

	return errors

}