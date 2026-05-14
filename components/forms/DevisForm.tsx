'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ArrowLeft, Check, Send } from 'lucide-react'
import GoldDivider from '@/components/shared/GoldDivider'

const schema = z.object({
  typeProjet: z.string().min(1, 'Sélectionnez un type de projet'),
  surface: z.string().optional(),
  delai: z.string().optional(),
  nom: z.string().min(2, 'Votre nom est requis'),
  email: z.string().email('Adresse email invalide'),
  telephone: z.string().min(8, 'Numéro de téléphone invalide'),
  ville: z.string().min(2, 'Ville requise'),
  message: z.string().optional(),
  commentConnu: z.string().optional(),
})

type FormData = z.infer<typeof schema>

const typesProjets = ['Cuisine', 'Salle de bain', 'Espace santé / médical', 'Bureautique / professionnel', 'Autre']
const surfaces = ['Moins de 5 m²', '5 – 15 m²', '15 – 40 m²', 'Plus de 40 m²', 'Pas encore défini']
const delais = ['Moins de 2 mois', '2 – 6 mois', '6 mois – 1 an', 'Plus d\'un an', 'Pas encore défini']
const commentConnus = ['Recommandation', 'Réseaux sociaux', 'Moteur de recherche', 'Bouche à oreille', 'Autre']

const STEPS = ['Votre projet', 'Vos coordonnées', 'Message']

export default function DevisForm() {
  const [step, setStep] = useState(0)
  const [submitted, setSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    trigger,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onBlur',
  })

  const inputClass =
    'w-full bg-transparent border border-gris-fume focus:border-or-champagne text-blanc-pur font-inter font-light text-sm px-4 py-3 outline-none transition-colors duration-300 placeholder:text-gris-texte/40'
  const labelClass = 'block font-inter text-[0.6rem] font-500 tracking-[0.15em] uppercase text-gris-texte mb-2'
  const errorClass = 'font-inter text-xs text-red-400 mt-1'

  const nextStep = async () => {
    const fields: (keyof FormData)[][] = [
      ['typeProjet'],
      ['nom', 'email', 'telephone', 'ville'],
      [],
    ]
    const valid = await trigger(fields[step])
    if (valid) setStep((s) => s + 1)
  }

  const onSubmit = async (data: FormData) => {
    await new Promise((r) => setTimeout(r, 1000))
    console.log('Devis form:', data)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-16"
      >
        <div className="w-16 h-16 border border-or-champagne flex items-center justify-center mx-auto mb-8">
          <Check size={24} strokeWidth={1.5} className="text-or-champagne" />
        </div>
        <h3 className="font-cormorant font-light text-blanc-pur text-3xl mb-4">
          Demande envoyée.
        </h3>
        <p className="font-inter font-light text-gris-texte text-sm max-w-md mx-auto">
          Nous avons bien reçu votre demande de devis. Notre équipe vous contacte
          sous 48 heures ouvrées à l&apos;adresse <span className="text-or-champagne">gestcom@promacryl.tn</span>.
        </p>
      </motion.div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress */}
      <div className="flex items-center gap-0 mb-12">
        {STEPS.map((s, i) => (
          <div key={s} className="flex items-center flex-1 last:flex-none">
            <div className="flex items-center gap-3">
              <div
                className={`w-8 h-8 flex items-center justify-center border transition-colors duration-300 ${
                  i <= step
                    ? 'border-or-champagne text-or-champagne'
                    : 'border-gris-fume text-gris-texte'
                }`}
              >
                {i < step ? (
                  <Check size={14} strokeWidth={1.5} />
                ) : (
                  <span className="font-inter text-xs">{i + 1}</span>
                )}
              </div>
              <span
                className={`font-inter text-[0.6rem] tracking-[0.12em] uppercase transition-colors duration-300 hidden sm:block ${
                  i <= step ? 'text-or-champagne' : 'text-gris-texte/40'
                }`}
              >
                {s}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className={`flex-1 h-px mx-4 transition-colors duration-500 ${
                  i < step ? 'bg-or-champagne' : 'bg-gris-fume'
                }`}
              />
            )}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div
              key="step0"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              <div>
                <label className={labelClass}>Type de projet *</label>
                <select {...register('typeProjet')} className={inputClass}>
                  <option value="">Sélectionner</option>
                  {typesProjets.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
                {errors.typeProjet && <p className={errorClass}>{errors.typeProjet.message}</p>}
              </div>

              <div>
                <label className={labelClass}>Surface estimée</label>
                <select {...register('surface')} className={inputClass}>
                  <option value="">Sélectionner (optionnel)</option>
                  {surfaces.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              <div>
                <label className={labelClass}>Délai souhaité</label>
                <select {...register('delai')} className={inputClass}>
                  <option value="">Sélectionner (optionnel)</option>
                  {delais.map((d) => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className={labelClass}>Nom & Prénom *</label>
                  <input
                    {...register('nom')}
                    type="text"
                    placeholder="Mohamed Dupont"
                    className={inputClass}
                  />
                  {errors.nom && <p className={errorClass}>{errors.nom.message}</p>}
                </div>
                <div>
                  <label className={labelClass}>Téléphone *</label>
                  <input
                    {...register('telephone')}
                    type="tel"
                    placeholder="+216 XX XXX XXX"
                    className={inputClass}
                  />
                  {errors.telephone && <p className={errorClass}>{errors.telephone.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className={labelClass}>Email *</label>
                  <input
                    {...register('email')}
                    type="email"
                    placeholder="vous@exemple.com"
                    className={inputClass}
                  />
                  {errors.email && <p className={errorClass}>{errors.email.message}</p>}
                </div>
                <div>
                  <label className={labelClass}>Ville *</label>
                  <input
                    {...register('ville')}
                    type="text"
                    placeholder="Tunis"
                    className={inputClass}
                  />
                  {errors.ville && <p className={errorClass}>{errors.ville.message}</p>}
                </div>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              <div>
                <label className={labelClass}>Message libre</label>
                <textarea
                  {...register('message')}
                  rows={5}
                  placeholder="Décrivez votre projet en quelques mots — dimensions, matière souhaitée, contraintes particulières…"
                  className={`${inputClass} resize-none`}
                />
              </div>

              <div>
                <label className={labelClass}>Comment nous avez-vous connus ?</label>
                <select {...register('commentConnu')} className={inputClass}>
                  <option value="">Sélectionner (optionnel)</option>
                  {commentConnus.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <p className="font-inter font-light text-xs text-gris-texte/50">
                En soumettant ce formulaire, vous acceptez que vos données soient utilisées
                pour traiter votre demande. Votre message sera envoyé à{' '}
                <span className="text-or-champagne/70">gestcom@promacryl.tn</span>.
                Consulter notre{' '}
                <a href="/politique-confidentialite" className="text-or-champagne/70 hover:text-or-champagne transition-colors">
                  politique de confidentialité
                </a>.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-center justify-between mt-10 pt-8 border-t border-gris-fume">
          {step > 0 ? (
            <button
              type="button"
              onClick={() => setStep((s) => s - 1)}
              className="btn-ghost"
            >
              <ArrowLeft size={14} strokeWidth={1.5} />
              Retour
            </button>
          ) : (
            <div />
          )}

          {step < STEPS.length - 1 ? (
            <button type="button" onClick={nextStep} className="btn-primary">
              Suivant
              <ArrowRight size={14} strokeWidth={1.5} />
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Envoi en cours…' : 'Envoyer ma demande'}
              <Send size={14} strokeWidth={1.5} />
            </button>
          )}
        </div>
      </form>
    </div>
  )
}
